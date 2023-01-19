import React, { memo, useCallback, useState, useEffect } from 'react';

import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow';

import Button from '@mui/material/Button';

import axios from 'axios';

import {
  nodes as initialNodes,
  edges as initialEdges,
} from './initial-elements';

import SourceNode from './SourceNode';
import TransformNode from './TransformNode';
import TargetNode from './TargetNode';

import 'reactflow/dist/style.css';
import './overview.css';

const nodeTypes = {
  source: SourceNode,
  transform: TransformNode,
  target: TargetNode,
};

const minimapStyle = {
  height: 120,
};

const onInit = (reactFlowInstance) => {
  const flow = reactFlowInstance.toObject();
};

export function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  // we are using a bit of a shortcut here to adjust the edge type
  // this could also be done with a custom edge for example
  const edgesWithUpdatedTypes = edges.map((edge) => {
    if (edge.sourceHandle) {
      const edgeType = nodes.find((node) => node.type === 'source').data
        .selects[edge.sourceHandle];
      edge.type = edgeType;
    }
    return edge;
  });

  const run = async (e) => {
    axios.get('http://127.0.0.1:8000/datasets/turtles/17').then((response) => {
      // handle success
      let fnPromiseList = [];
      response.data.forEach((turtle) => {
        console.log(turtle);
        fnPromiseList.push(
          new Promise((resolve, reject) => {
            axios
              .post('http://localhost:3333/api/property/125', {
                name: turtle['predicate'],
              })
              .then((res) => {
                turtle['predicate'] = 'P'+res.data['id'];
                resolve(turtle);
              });
          })
        );
        // await axios
        //   .post('http://localhost:3333/api/property/125', {
        //     name: turtle['predicate'],
        //   })
        //   .then(async (response) => {
        //     turtle['predicate'] = 'P' + response.data['id'];
        //     console.log(turtle);
        //     await axios
        //       .post('http://localhost:3333/api/entity/125', turtle)
        //       .then((response) => {
        //         console.log(response);
        //       });
        //   });
      });
      Promise.all(fnPromiseList).then(async (res) => {
        for(let i of res){
          console.log(i);
          await axios.post('http://localhost:3333/api/entity/125', i);
        }
      });
    });

    // datasets.forEach((data)=>{
    //   console.log(data);

    // })
  };

  return (
    <div style={{ height: '100%' }}>
      {/* <div>
      {datasets.length > 0 && (
        <ul>
          {datasets.map(dataset => (
            <li key={dataset.id}>{dataset.name}</li>
          ))}
        </ul>
      )}
    </div> */}
      <Button onClick={run} variant="contained" color="success">
        运行
      </Button>

      <ReactFlow
        nodes={nodes}
        edges={edgesWithUpdatedTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={onInit}
        fitView
        attributionPosition="top-right"
        nodeTypes={nodeTypes}
      >
        <MiniMap style={minimapStyle} zoomable pannable />
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
}
export default App;

import React, { useCallback, useState, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow';

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

const onInit = (reactFlowInstance) =>
  console.log('flow loaded:', reactFlowInstance);

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

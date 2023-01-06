import React, { memo, useCallback, useState, useEffect } from 'react';

import { Handle, useReactFlow, useStoreApi } from 'reactflow';


const options = [
   
    {
      name: '属性对齐',
    }
  ];
  

function Select() {
//   const [datasets, setDatasets] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const fetchData = () => {
//     setIsLoading(true);
//     fetch('http://localhost:3333/api/schemas')
//       .then((response) => {
//         return response.json();
//       })
//       .then((data) => {
//         setIsLoading(false);
//         setDatasets(data);
//       });
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

  return (
    <div className="transform-node__select">
      <div>数据处理</div>
      <select className="nodrag">
        {options.map((option) => (
          <option key={option.name} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
      <Handle type="target" position="left"  />
      <Handle type="source" position="right"  />
    </div>
  );
}

function TransformNode({ id, data }) {
  return (
    <>
      <div className="transform-node__header">
        <strong>数据处理</strong>
      </div>
      <div className="transform-node__body">
        <Select/>
      </div>
    </>
  );
}

export default memo(TransformNode);
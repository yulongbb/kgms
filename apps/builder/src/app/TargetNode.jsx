import React, { memo, useCallback, useState, useEffect } from 'react';

import { Handle, useReactFlow, useStoreApi } from 'reactflow';

function Select() {
  const [datasets, setDatasets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    setIsLoading(true);
    fetch('http://localhost:3333/api/schemas')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        setDatasets(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="source-node__select">
      <div>选择知识图谱</div>
      <select className="nodrag">
        {datasets.map((option) => (
          <option key={option.name} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
      <Handle type="target" position="left"  />
    </div>
  );
}

function TargetNode({ id, data }) {
  return (
    <>
      <div className="target-node__header">
        <strong>知识图谱</strong>
      </div>
      <div className="target-node__body">
        <Select/>
      </div>
    </>
  );
}

export default memo(TargetNode);

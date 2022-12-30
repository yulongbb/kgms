import React, { memo, useCallback, useState, useEffect } from 'react';

import { Handle, useReactFlow, useStoreApi } from 'reactflow';

function Select(handleId) {
  const [datasets, setDatasets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    setIsLoading(true);
    fetch('http://localhost:3333/api/dataset')
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
    <div className="custom-node__select">
      <div>选择数据源</div>
      <select className="nodrag">
        {datasets.map((option) => (
          <option key={option.name} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
      <Handle type="source" position="right" id={handleId} />
    </div>
  );
}

function CustomNode({ id, data }) {
  return (
    <>
      <div className="custom-node__header">
        <strong>数据源</strong>
      </div>
      <div className="custom-node__body">
        <Select handleId='smoothstep'/>
      </div>
    </>
  );
}

export default memo(CustomNode);

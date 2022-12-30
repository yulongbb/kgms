import React, { memo, useCallback, useState, useEffect } from 'react';

import { Handle, useReactFlow, useStoreApi } from 'reactflow';

function SourceNode({ id, data }) {
  const [value, setValue] = useState('孙玉龙');

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

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div className="source-node__header">
        <strong>{value}</strong>
      </div>
      <div className="source-node__body">
        <div className="source-node__select">
          <div>选择数据源</div>
          <select className="nodrag" value={value} onChange={handleChange}>
            {datasets.map((option) => (
              <option key={option.name} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
          <Handle type="source" position="right" />
        </div>
      </div>
    </>
  );
}

export default memo(SourceNode);

import React, { DragEvent } from 'react';
import styles from './dnd.module.css';

const onDragStart = (event: DragEvent, nodeType: string) => {
  event.dataTransfer.setData('application/reactflow', nodeType);
  event.dataTransfer.effectAllowed = 'move';
};

const Sidebar = () => {
  return (
    <aside className={styles.aside}>
      <div className={styles.description}>
        You can drag these nodes to the pane on the left.
      </div>
      <div
        className='react-flow__node-input'
        onDragStart={(event: DragEvent) => onDragStart(event, '数据源')}
        draggable
      >
        数据源
      </div>
      <div
        className='react-flow__node-default'
        onDragStart={(event: DragEvent) => onDragStart(event, '数据处理')}
        draggable
      >
        数据处理
      </div>
      <div
        className='react-flow__node-output'
        onDragStart={(event: DragEvent) => onDragStart(event, '知识图谱')}
        draggable
      >
        知识图谱
      </div>
    </aside>
  );
};

export default Sidebar;

import React from 'react';
import { MarkerType, Position } from 'reactflow';

export const nodes = [
  {
    id: '1',
    type: 'source',
    position: { x: 100, y: 200 },
  },

  {
    id: '2',
    type: 'transform',
    position: { x: 400, y: 200 },
  },

  {
    id: '3',
    type: 'target',
    position: { x: 700, y: 200 },
  }
];

export const edges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'smoothstep',
    data: {
      selectIndex: 0,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    animated: true
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    type: 'smoothstep',
    data: {
      selectIndex: 0,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    animated: true
  },
];

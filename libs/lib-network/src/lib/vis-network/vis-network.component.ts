import { Component, OnInit } from '@angular/core';
declare var vis: any;

@Component({
  selector: 'kgms-vis-network',
  templateUrl: './vis-network.component.html',
  styleUrls: ['./vis-network.component.css'],
})
export class VisNetworkComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    // create an array with nodes
    const nodes = [
      {
        id: 1,
        shape: 'circularImage',
        label: 'fallback image in action',
        image: 'https://avatars.githubusercontent.com/u/17495916?v=4',
      },
      {
        id: 2,
        shape: 'circularImage',
        label: 'fallback image in action',
        image: 'https://avatars.githubusercontent.com/u/17495916?v=4',
      },
      {
        id: 3,
        shape: 'circularImage',
        label: 'fallback image in action',
        image: 'https://avatars.githubusercontent.com/u/17495916?v=4',
      },
      {
        id: 4,
        shape: 'circularImage',
        label: 'fallback image in action',
        image: 'https://avatars.githubusercontent.com/u/17495916?v=4',
      },
      {
        id: 5,
        shape: 'circularImage',
        label: 'fallback image in action',
        image: 'https://avatars.githubusercontent.com/u/17495916?v=4',
      },
      {
        id: 6,
        shape: 'circularImage',
        label: 'fallback image in action',
        image: 'https://avatars.githubusercontent.com/u/17495916?v=4',
      },
      {
        id: 7,
        shape: 'circularImage',
        label: 'fallback image in action',
        image: 'https://avatars.githubusercontent.com/u/17495916?v=4',
      },
      {
        id: 8,
        shape: 'circularImage',
        label: 'fallback image in action',
        image: 'https://avatars.githubusercontent.com/u/17495916?v=4',
      },
      {
        id: 9,
        shape: 'circularImage',
        image: 'https://avatars.githubusercontent.com/u/17495916?v=4',
      },
      {
        id: 10,
        shape: 'circularImage',
        label: 'fallback image in action',
        image: 'https://avatars.githubusercontent.com/u/17495916?v=4',
      },
      {
        id: 11,
        shape: 'circularImage',
        label: 'fallback image in action',
        image: 'https://avatars.githubusercontent.com/u/17495916?v=4',
      },
      {
        id: 12,
        shape: 'circularImage',
        label: 'fallback image in action',
        image: 'https://avatars.githubusercontent.com/u/17495916?v=4',
      },
      {
        id: 13,
        shape: 'circularImage',
        label: 'fallback image in action',
        image: 'https://avatars.githubusercontent.com/u/17495916?v=4',
      },
      {
        id: 14,
        shape: 'circularImage',
        label: 'fallback image in action',
        image: 'https://avatars.githubusercontent.com/u/17495916?v=4',
      },
      {
        id: 15,
        shape: 'circularImage',
        image: "https://avatars.githubusercontent.com/u/17495916?v=4",
        brokenImage: "https://avatars.githubusercontent.com/u/17495916?v=4",
        label: 'when images\nfail\nto load',
      },
      {
        id: 16,
        shape: 'circularImage',
        image: "https://avatars.githubusercontent.com/u/17495916?v=4",
        brokenImage: "https://avatars.githubusercontent.com/u/17495916?v=4",
        label: 'fallback image in action',
      },
    ];

    // create connections between people
    // value corresponds with the amount of contact between two people
    const edges = [
      { from: 1, to: 2 },
      { from: 2, to: 3 },
      { from: 2, to: 4 },
      { from: 4, to: 5 },
      { from: 4, to: 10 },
      { from: 4, to: 6 },
      { from: 6, to: 7 },
      { from: 7, to: 8 },
      { from: 8, to: 9 },
      { from: 8, to: 10 },
      { from: 10, to: 11 },
      { from: 11, to: 12 },
      { from: 12, to: 13 },
      { from: 13, to: 14 },
      { from: 9, to: 16 },
    ];

    // create a network
    const container = document.getElementById('mynetwork');
    var data = {
      nodes: nodes,
      edges: edges,
    };
    var options = {
      nodes: {
        borderWidth: 4,
        size: 30,
        color: {
          border: "#222222",
          background: "#666666",
        },
        font: {
          size: 18,
          color: "#000",
        },
      },
      edges: {
        color: "lightgray",
      },
    };
    const network = new vis.Network(container, data, options);
    network.moveTo({
      position: { x: 0, y: 100 },
      scale: 2,
    });

    network.on('click', (properties: any) => {
      console.log('pointer', properties);
    });
  }
}

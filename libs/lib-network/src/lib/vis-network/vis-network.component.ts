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
    const nodes = new vis.DataSet([
      {
        id: 1,
        label: 'Node 1',
        x: -209.5,
        y: 42,
      },
      { id: 2, label: 'Node 2', x: -121.5, y: 14.5 },
      { id: 3, label: 'Node 3', x: -7.5, y: -3 },
      { id: 4, label: 'Node 4', x: 93.5, y: -17 },
      { id: 5, label: 'Node 5', x: 200, y: 50 },
    ]);

    // create a network
    const container = document.getElementById('mynetwork');
    const data = {
      nodes: nodes,
    };

    const options = {
      nodes: {
        shape: 'circle',
      },
      interaction: {
        dragNodes: true,
        dragView: true,
        hover: true,
        zoomView: false,
      },
      physics: {
        enabled: false,
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

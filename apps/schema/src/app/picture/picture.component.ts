import { Component } from '@angular/core';
declare var vis: any;

@Component({
  selector: 'kgms-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css'],
})
export class PictureComponent {
  constructor() {}

  ngOnInit() {
    // create an array with nodes
    const nodes = new vis.DataSet([
      {
        id: 1,
        label: 'Node 1',
        x: -200,
        y: 40,
      },
      { id: 2, label: 'Node 2', x: -100, y: 0 },
      { id: 3, label: 'Node 3', x: 0, y: 0 },
      { id: 4, label: 'Node 4', x: 100, y: 0 },
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
  }
}

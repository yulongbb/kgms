import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kgms-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css'],
})
export class PictureComponent implements OnInit {
  ngOnInit(): void {
    const cytoscape = require('cytoscape');
    const cyqtip = require('cytoscape-qtip');

    cyqtip( cytoscape ); 

    const cy = cytoscape({
      container: document.getElementById('cy'), // container to render in
      zoomingEnabled: false,
      panningEnabled: false,
      elements: [
        // list of graph elements to start with
        {
          // node a
          data: { id: 'Ashley Biden' },
          position: {
            // the model position of the node (optional on init, mandatory after)
            x: 204,
            y: 186,
          },
          locked: true,
          style: {
            width: 150,
            height: 150,
          },
        },
        {
          // node b
          data: { id: 'Natali Germanotta' },
          position: {
            // the model position of the node (optional on init, mandatory after)
            x: 371,
            y: 157,
          },
          locked: true,
          style: {
            width: 150,
            height: 150,
          },
        },
        {
          // node b
          data: { id: 'Joe Biden' },
          position: {
            // the model position of the node (optional on init, mandatory after)
            x: 578,
            y: 136,
          },
          locked: true,
          style: {
            width: 150,
            height: 150,
          },
        },
        {
          // node b
          data: { id: 'Lady Gaga' },
          position: {
            // the model position of the node (optional on init, mandatory after)
            x: 766,
            y: 114,
          },
          locked: true,
          style: {
            width: 150,
            height: 150,
          },
        },
        {
          // node b
          data: { id: 'Jill Biden' },
          position: {
            // the model position of the node (optional on init, mandatory after)
            x: 981,
            y: 215,
          },
          locked: true,
          style: {
            width: 150,
            height: 150,
          },
        },
      ],

      style: [
        // the stylesheet for the graph
        {
          selector: 'node',
          style: {
            'background-color': '#ff0',
            'background-opacity': 0.2,
            label: 'data(id)',
            'font-size': '0',
            color: '#fff',
          },
        },
        {
          selector: ':selected',
          css: {
            'border-width': 2,
            'border-color': 'SteelBlue',
            'background-opacity': 0,
            'line-color': 'black',
            'target-arrow-color': 'black',
            'source-arrow-color': 'black',
          },
        },
      ],

      layout: {
        name: 'null',
        fit: false,
      },
    });
    cy.on('tap', (evt: any) => {
      console.log(evt.position);
    });

    cy.elements().qtip({
      content: function(){ return this.id() },
      position: {
        my: 'top center',
        at: 'bottom center'
      },
      style: {
        classes: 'qtip-bootstrap',
        tip: {
          width: 16,
          height: 8
        }
      }
    });

    // call on core
    cy.qtip({
      content: 'Example qTip on core bg',
      position: {
        my: 'top center',
        at: 'bottom center'
      },
      show: {
        cyBgOnly: true
      },
      style: {
        classes: 'qtip-bootstrap',
        tip: {
          width: 16,
          height: 8
        }
      }
    });


  }
}

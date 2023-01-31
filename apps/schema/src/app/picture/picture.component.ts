import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
declare let $: any;

@Component({
  selector: 'kgms-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css'],
})
export class PictureComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    const cytoscape = require('cytoscape');
    const cyqtip = require('cytoscape-qtip');

    cyqtip(cytoscape);

    const cy = cytoscape({
      container: document.getElementById('cy'), // container to render in
      zoomingEnabled: false,
      panningEnabled: false,
      elements: [
        // list of graph elements to start with
        {
          // node a
          data: { id: 'Q33880', label: 'Ashley Biden' },
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
          data: { id: 'Q33883', label: 'Natali Germanotta' },
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
          data: { id: 'Q33824', label: 'Joe Biden' },
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
          data: { id: 'Q33837', label: 'Lady Gaga' },
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
          data: { id: 'Q33875', label: 'Jill Biden' },
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

    var doubleClickDelayMs = 350;
    var previousTapStamp: any;
    cy.on('tap', (ele: any) => {
      var evtTarget: any = ele.target;
      var currentTapStamp = ele.timeStamp;
      var msFromLastTap = currentTapStamp - previousTapStamp;
      if (msFromLastTap < doubleClickDelayMs) {
        ele.target.trigger('doubleTap', ele);
      }
      previousTapStamp = currentTapStamp;
    });

    /**
     * 双击操作
     */
    cy.on('doubleTap', (event: any, originalTapEvent: any) => {
      var target = event.target;
      var data = target.data();
      var group = target.group();
      // 编辑节点
      if (group == 'nodes') {
        const dialogRef = this.dialog.open(PictureDialogComponent, {
          data: data,
        });
      }
    });

    cy.elements().qtip({
      content: function () {
        console.log(this.data().label);
        return this.data().label;
      },
      position: {
        my: 'top center',
        at: 'bottom center',
      },
      style: {
        classes: 'qtip-bootstrap',
        tip: {
          width: 16,
          height: 8,
        },
      },
    });

    // call on core
    cy.qtip({
      content: 'Example qTip on core bg',
      position: {
        my: 'top center',
        at: 'bottom center',
      },
      show: {
        cyBgOnly: true,
      },
      style: {
        classes: 'qtip-bootstrap',
        tip: {
          width: 16,
          height: 8,
        },
      },
    });
  }
}

@Component({
  selector: 'kgms-picture-dialog',
  templateUrl: './picture-dialog.html',
})
export class PictureDialogComponent {
  instance: any;
  statements: Map<string, Array<string>>;

  constructor(
    public dialogRef: MatDialogRef<PictureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {
    this.statements = new Map<string, Array<string>>();
    this.http
      .get(
        `http://localhost:3333/api/entity/${data.id}`
      )
      .subscribe((instance: any) => {
        this.instance = instance;
        Object.keys(instance.claims).map((key: string) => {
          const values = new Array<string>();
          instance.claims[key].forEach((value: any) => {
            values.push(value.mainsnak.datavalue.value.id);
          });
          this.statements.set(key, values);
        });
        console.log(this.statements);
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

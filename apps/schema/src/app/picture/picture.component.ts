import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ElementRef } from '@angular/core';
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
  title =
    '乔·拜登问答：他的反性侵犯运动、Lady Gaga 的惊喜和“悲伤的”唐纳德·特朗普';

  content = ` 副总统乔·拜登 (Joe Biden) 在奥斯卡颁奖典礼上对 Lady Gaga 的介绍可能让 3400
  万观众头疼，但成千上万的大学生确切地理解政治家和全球巨星之间的联系。Gaga
  的奥斯卡提名歌曲“ Til It Happens to You”是为2015
  年一部关于校园性侵犯的纪录片《猎场》而创作的——2014
  年，拜登与奥巴马总统一起发起了“它在我们身上”倡议( itsonus.org
  )提高对同一问题的认识和集体责任（根据 ?NotAlone.gov的数据，五分之一的女性和
  1 名男性以及 16
  名男性在大学期间遭到性侵犯，两年前作为白宫保护学生免遭性侵犯特别工作组的一部分推出的资源网站）。现在，4
  月 7 日，Gaga 将与内华达大学拉斯维加斯分校的副校长一起，支持他代表 It's On
  Us 前往大学，到目前为止，已有来自 530 多所大学的 250,000
  名学生签署了一份团结和行动主义的承诺。在展望 2016 年大选后的生活时，73
  岁的拜登反思了为什么他最引以为豪的事业不会是他唯一的遗产`;

  linkeds = [
    { id: 'Q33824', names: ['乔·拜登', '拜登'] },
    { id: 'Q115089', names: ['唐纳德·特朗普'] },
    { id: 'Q33837', names: ['Lady Gaga', 'Gaga'] },
    { id: 'Q115105', names: ['奥巴马'] },
  ];

  constructor(public dialog: MatDialog, private elementRef: ElementRef) {}

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

  openAlert() {
    alert('hello');
  }

  ngAfterViewChecked() {
    if (this.elementRef.nativeElement.querySelectorAll('a')) {
      this.elementRef.nativeElement
        .querySelector('a')
        .addEventListener('click', this.openAlert.bind(this));
    }
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
      .get(`http://localhost:3333/api/entity/${data.id}`)
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

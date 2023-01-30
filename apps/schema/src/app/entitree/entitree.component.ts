import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
declare var Treant: any;

@Component({
  selector: 'kgms-entitree',
  templateUrl: './entitree.component.html',
  styleUrls: ['./entitree.component.css'],
})
export class EntitreeComponent {
  constructor() {}

  ngOnInit() {
    const simple_chart_config = {
      chart: {
        container: '#tree-simple',
      },

      nodeStructure: {
        text: { name: 'Parent node' },
        children: [
          {
            text: { name: 'First child' },
          },
          {
            text: { name: 'Second child' },
          },
        ],
      },
    };

    const my_chart = new Treant(simple_chart_config);
  }
}

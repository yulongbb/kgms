import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'kgms-angular-tree-component',
  templateUrl: './angular-tree-component.component.html',
  styleUrls: ['./angular-tree-component.component.css'],
})
export class AngularTreeComponentComponent {
  @Input() graph: any;
  @Input() nodes: any;
  @Output() selected = new EventEmitter<string>();
  options = {};

  constructor() {
    if (!this.nodes) {
      this.nodes = [
        {
          id: 1,
          name: 'root1',
          children: [
            { id: 2, name: 'child1' },
            { id: 3, name: 'child2' },
          ],
        },
        {
          id: 4,
          name: 'root2',
          children: [
            { id: 5, name: 'child2.1' },
            {
              id: 6,
              name: 'child2.2',
              children: [{ id: 7, name: 'subsub' }],
            },
          ],
        },
      ];
    }
  }

  go($event: any) {
    this.selected.emit($event);
    console.log($event);
  }
}

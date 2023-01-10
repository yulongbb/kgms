import { Component, Input } from '@angular/core';

@Component({
  selector: 'kgms-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css'],
})
export class EntityComponent {
  @Input() entity: any;
}

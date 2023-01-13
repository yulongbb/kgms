import { Component, Input } from '@angular/core';

@Component({
  selector: 'kgms-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css'],
})
export class MediaComponent {
  @Input() entity: any;

}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'kgms-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.css'],
})
export class StatementComponent {
  @Input() statements: any;

}

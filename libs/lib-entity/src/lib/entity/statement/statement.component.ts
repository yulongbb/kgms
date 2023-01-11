import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kgms-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.css'],
})
export class StatementComponent {
  @Input() statements: any;
  id:any;

  constructor(private route: ActivatedRoute) {
    this.id = this.route.snapshot.queryParamMap.get('id');
  }
}

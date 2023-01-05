import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Component({
  selector: 'kgms-instance',
  templateUrl: './instance.component.html',
  styleUrls: ['./instance.component.css'],
})
export class InstanceComponent {
  rowData$!: Observable<any[]>;
  columnDefs!: any[];


  constructor(private http: HttpClient) {
    this.columnDefs=[
      { field: '_fields.0.identity.low', headerName: 'id' },
      { field: '_fields.0.properties.label', headerName: 'label' },
    ]
    this.rowData$ = this.http.get<any[]>(
      'http://localhost:3333/api/entity'
    );
  }
}

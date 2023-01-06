import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
@Component({
  selector: 'kgms-instances',
  templateUrl: './instances.component.html',
  styleUrls: ['./instances.component.css'],
})
export class InstancesComponent {
  rowData$!: Observable<any[]>;
  columnDefs!: any[];

  constructor(private http: HttpClient) {
    this.columnDefs = [
      { field: '_fields.0.identity.low', headerName: 'id', cellRenderer: (params: any) => {
        return `Q${params.value}`;
      },},
      {
        field: '_fields.0',
        headerName: 'label',
        cellRenderer: (params: any) => {
          return `<a href="http://localhost:4200/instance/detail/Q${params.value.identity.low}">${params.value.properties.label}</a>`;
        },
      },
    ];
    this.rowData$ = this.http.get<any[]>('http://localhost:3333/api/entity');
  }
}

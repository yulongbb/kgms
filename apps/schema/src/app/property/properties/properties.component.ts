import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
@Component({
  selector: 'kgms-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css'],
})
export class PropertiesComponent {
  rowData$!: Observable<any[]>;
  columnDefs!: any[];


  constructor(private http: HttpClient) {
    this.columnDefs=[
      { field: 'id', headerName: 'id' , cellRenderer: (params: any) => {
        return `P${params.value}`;
      },},
      { field: 'name', headerName: 'name' },
    ]
    this.rowData$ = this.http.get<any[]>(
      'http://localhost:3333/api/property'
    );
  }
}

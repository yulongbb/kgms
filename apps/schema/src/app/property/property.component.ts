import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
@Component({
  selector: 'kgms-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css'],
})
export class PropertyComponent {
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

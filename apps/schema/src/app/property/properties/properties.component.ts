import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'kgms-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css'],
})
export class PropertiesComponent {
  rowData$!: Observable<any[]>;
  columnDefs!: any[];
  schema:any;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params: any) => {
      this.schema = params['id'];

      this.columnDefs = [
        {
          field: 'id',
          headerName: 'id',
          cellRenderer: (params: any) => {
            return `P${params.value}`;
          },
        },
        { field: 'name', headerName: 'name' },
      ];
      this.rowData$ = this.http.get<any[]>(
        `http://localhost:3333/api/property/schema/${params['id']}`
      );
    });
  }
}

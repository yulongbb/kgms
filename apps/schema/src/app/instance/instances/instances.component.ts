import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
@Component({
  selector: 'kgms-instances',
  templateUrl: './instances.component.html',
  styleUrls: ['./instances.component.css'],
})
export class InstancesComponent {
  rowData$!: Observable<any[]>;
  columnDefs!: any[];
  schema: any;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params: any) => {
      this.schema = params['id'];
      this.columnDefs = [
        {
          field: '_fields.0.identity.low',
          headerName: 'id',
          cellRenderer: (params: any) => {
            return `Q${params.value}`;
          },
        },

        {
          field: '_fields.0.properties.type',
          headerName: 'type',
        },
        {
          field: '_fields.0',
          headerName: 'label',
          cellRenderer: (params: any) => {
            return `<a href="http://localhost:4200/instance/detail/Q${params.value.identity.low}?id=${params.value.properties.schema.low}">${params.value.properties.label}</a>`;
          },
        },
      ];
      this.rowData$ = this.http.get<any[]>(
        `http://localhost:3333/api/entity/schema/${this.schema}`
      );
    });
  }
}

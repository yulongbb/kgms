import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, Input } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';

@Component({
  selector: 'kgms-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.css'],
})
export class AgGridComponent {
  @Input() public rowData$!: Observable<any[]>;
  // Each Column Definition results in one Column.
  @Input() public columnDefs!: ColDef[];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  // Data that gets displayed in the grid

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  constructor(private http: HttpClient) {}

  // Example load data from sever
  onGridReady(params: GridReadyEvent) {
    if(!this.rowData$){
      this.rowData$ = this.http.get<any[]>(
        'https://www.ag-grid.com/example-assets/row-data.json'
      );
    }
    if(!this.columnDefs){
      this.columnDefs= [
        { field: 'make' },
        { field: 'model' },
        { field: 'price' },
      ]
    }
  }

  // Example of consuming Grid Event
  onCellClicked(e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  // Example using Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { AgGridModule } from 'ag-grid-angular';

import { AgGridComponent } from './ag-grid/ag-grid.component';

@NgModule({
  imports: [CommonModule, HttpClientModule, AgGridModule],
  declarations: [AgGridComponent],
  exports: [AgGridComponent],
})
export class LibTableModule {}

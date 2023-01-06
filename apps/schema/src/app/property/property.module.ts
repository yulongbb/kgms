import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibTableModule } from '@lib/table';

import { PropertyRoutingModule } from './property-routing.module';

import { PropertyComponent } from './property.component';
import { PropertiesComponent } from './properties/properties.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { PropertySearchComponent } from './property-search/property-search.component';

@NgModule({
  declarations: [
    PropertyComponent,
    PropertiesComponent,
    PropertyDetailComponent,
    PropertySearchComponent,
  ],
  imports: [CommonModule, PropertyRoutingModule, LibTableModule],
})
export class PropertyModule {}

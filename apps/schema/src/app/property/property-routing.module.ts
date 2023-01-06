import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertyComponent } from './property.component';
import { PropertiesComponent } from './properties/properties.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';


const routes: Routes = [{
  path: '',
  component: PropertyComponent,
  children: [
    { path: 'detail/:id', component: PropertyDetailComponent },
    { path: 'properties', component: PropertiesComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropertyRoutingModule {}
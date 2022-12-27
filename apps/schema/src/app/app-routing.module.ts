import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertyComponent } from './property/property.component';
import { SchemaComponent } from './schema/schema.component';



const routes: Routes = [
  { path: '', redirectTo: '/schema', pathMatch: 'full' },
  { path: 'schema', component: SchemaComponent },
  { path: 'property', component: PropertyComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
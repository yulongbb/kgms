import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertyComponent } from './property/property.component';
import { SchemaComponent } from './schema/schema.component';
import { DatasetComponent } from './dataset/dataset.component';
import { BuilderComponent } from './builder/builder.component';
import { GraphComponent } from './graph/graph.component';
import { MapComponent } from './map/map.component';
import { EarthComponent } from './earth/earth.component';

const routes: Routes = [
  { path: '', redirectTo: '/schema', pathMatch: 'full' },
  { path: 'dataset', component: DatasetComponent },
  { path: 'schema', component: SchemaComponent },
  { path: 'builder', component: BuilderComponent },
  {
    path: 'property',
    loadChildren: () =>
      import('./property/property.module').then((m) => m.PropertyModule),
  },
  {
    path: 'instance',
    loadChildren: () =>
      import('./instance/instance.module').then((m) => m.InstanceModule),
  },
  { path: 'graph', component: GraphComponent },
  { path: 'map', component: MapComponent },
  { path: 'earth', component: EarthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

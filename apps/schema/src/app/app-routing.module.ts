import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertyComponent } from './property/property.component';
import { SchemaComponent } from './schema/schema.component';
import { DatasetComponent } from './dataset/dataset.component';
import { BuilderComponent } from './builder/builder.component';
import { GraphComponent } from './graph/graph.component';



const routes: Routes = [
  { path: '', redirectTo: '/schema', pathMatch: 'full' },
  { path: 'dataset', component: DatasetComponent },
  { path: 'schema', component: SchemaComponent },
  { path: 'property', component: PropertyComponent },
  { path: 'builder', component: BuilderComponent },
  {
    path: 'instance',
    loadChildren: () => import('./instance/instance.module')
      .then(m => m.InstanceModule),
  },
  { path: 'graph', component: GraphComponent },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstanceComponent } from './instance.component';
import { InstancesComponent } from './instances/instances.component';
import { InstanceDetailComponent } from './instance-detail/instance-detail.component';


const routes: Routes = [{
  path: '',
  component: InstanceComponent,
  children: [
    { path: 'detail/:id', component: InstanceDetailComponent },
    { path: 'instances', component: InstancesComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstanceRoutingModule {}
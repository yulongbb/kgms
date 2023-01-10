import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibTableModule } from '@lib/table';
import { LibEntityModule } from '@lib/entity';

import { InstanceRoutingModule } from './instance-routing.module';

import { InstanceComponent } from './instance.component';
import { InstancesComponent } from './instances/instances.component';
import { InstanceDetailComponent } from './instance-detail/instance-detail.component';
import { InstanceSearchComponent } from './instance-search/instance-search.component';

@NgModule({
  declarations: [
    InstanceComponent,
    InstancesComponent,
    InstanceDetailComponent,
    InstanceSearchComponent,
  ],
  imports: [CommonModule, InstanceRoutingModule, LibTableModule,LibEntityModule],
})
export class InstanceModule {}

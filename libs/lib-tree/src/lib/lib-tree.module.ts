import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeModule } from '@circlon/angular-tree-component';

import { AngularTreeComponentComponent } from './angular-tree-component/angular-tree-component.component';

@NgModule({
  imports: [CommonModule,TreeModule],
  declarations: [AngularTreeComponentComponent],
  exports: [AngularTreeComponentComponent],

})
export class LibTreeModule {}

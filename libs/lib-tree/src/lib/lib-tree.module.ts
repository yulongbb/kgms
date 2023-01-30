import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeModule } from '@circlon/angular-tree-component';
import { RouterModule } from '@angular/router';

import { AngularTreeComponentComponent } from './angular-tree-component/angular-tree-component.component';
import { G6EntitreeComponent } from './g6-entitree/g6-entitree.component';

@NgModule({
  imports: [CommonModule, TreeModule, RouterModule],
  declarations: [AngularTreeComponentComponent, G6EntitreeComponent],
  exports: [AngularTreeComponentComponent, G6EntitreeComponent],
})
export class LibTreeModule {}

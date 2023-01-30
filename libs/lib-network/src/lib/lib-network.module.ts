import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisNetworkComponent } from './vis-network/vis-network.component';

@NgModule({
  imports: [CommonModule],
  declarations: [VisNetworkComponent],
  exports: [VisNetworkComponent]

})
export class LibNetworkModule {}

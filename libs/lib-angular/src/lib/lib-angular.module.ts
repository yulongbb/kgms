import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InnerComponent } from './inner/inner.component';

@NgModule({
  imports: [CommonModule],
  declarations: [InnerComponent],
  exports: [InnerComponent]
})
export class LibAngularModule {}

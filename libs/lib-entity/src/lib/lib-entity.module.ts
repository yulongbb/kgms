import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityComponent } from './entity/entity.component';
import { StatementComponent } from './entity/statement/statement.component';
import { PropertyPipe } from './pipes/property.pipe';
import { ValuePipe } from './pipes/value.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [EntityComponent, StatementComponent,PropertyPipe,ValuePipe],
  entryComponents: [PropertyPipe,ValuePipe],
  exports: [EntityComponent,StatementComponent],
})
export class LibEntityModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityComponent } from './entity/entity.component';
import { StatementComponent } from './entity/statement/statement.component';
import { PropertyPipe } from './pipes/property.pipe';
import { ValuePipe } from './pipes/value.pipe';
import { MediaComponent } from './media/media.component';
import { CarouselComponent } from './carousel/carousel.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    EntityComponent,
    StatementComponent,
    PropertyPipe,
    ValuePipe,
    MediaComponent,
    CarouselComponent,
  ],
  entryComponents: [PropertyPipe, ValuePipe],
  exports: [
    EntityComponent,
    StatementComponent,
    MediaComponent,
    CarouselComponent,
  ],
})
export class LibEntityModule {}

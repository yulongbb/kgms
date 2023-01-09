import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { LeafletComponent } from './leaflet/leaflet.component';
import { GlobeglComponent } from './globegl/globegl.component';

@NgModule({
  imports: [CommonModule, LeafletModule],
  declarations: [LeafletComponent, GlobeglComponent],
  exports: [LeafletComponent, GlobeglComponent],
})
export class LibMapModule {}

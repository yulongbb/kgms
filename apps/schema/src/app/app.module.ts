import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LibTableModule } from '@lib/table';
import { LibTreeModule } from '@lib/tree';
import { LibMapModule } from '@lib/map';
import { LibEntityModule } from '@lib/entity';
import { LibNetworkModule } from '@lib/network';

import { AppComponent, DialogComponent } from './app.component';
import { MaterialModule } from './material.module';
import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { SchemaComponent } from './schema/schema.component';
import { DatasetComponent } from './dataset/dataset.component';
import { BuilderComponent } from './builder/builder.component';
import { EntitreeComponent } from './entitree/entitree.component';
import { GraphComponent } from './graph/graph.component';
import { MapComponent } from './map/map.component';
import { EarthComponent } from './earth/earth.component';
import {
  PictureComponent,
  PictureDialogComponent,
} from './picture/picture.component';
import { EntityDialogComponent, LearnComponent } from './learn/learn.component';
import { EntityPipe } from './learn/entity.pipe';
import { ValuePipe } from './learn/value.pipe';
import { LinkedPipe } from './picture/linked.pipe';
import { PropertyPipe } from './learn/property.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    SchemaComponent,
    DatasetComponent,
    BuilderComponent,
    EntitreeComponent,
    GraphComponent,
    MapComponent,
    EarthComponent,
    LearnComponent,
    PictureComponent,
    EntityPipe,
    ValuePipe,
    PropertyPipe,
    LinkedPipe,
    EntityDialogComponent,
    PictureDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    LibTableModule,
    LibTreeModule,
    LibMapModule,
    LibEntityModule,
    LibNetworkModule,
  ],
  providers: [AppService],
  bootstrap: [AppComponent],
})
export class AppModule {}

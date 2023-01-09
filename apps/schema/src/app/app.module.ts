import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LibTableModule } from '@lib/table';
import { LibTreeModule } from '@lib/tree';
import { LibMapModule } from '@lib/map';

import { AppComponent, DialogComponent } from './app.component';
import { MaterialModule } from './material.module';
import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { SchemaComponent } from './schema/schema.component';
import { PropertyComponent } from './property/property.component';
import { DatasetComponent } from './dataset/dataset.component';
import { BuilderComponent } from './builder/builder.component';
import { GraphComponent } from './graph/graph.component';
import { MapComponent } from './map/map.component';
import { EarthComponent } from './earth/earth.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    SchemaComponent,
    DatasetComponent,
    BuilderComponent,
    GraphComponent,
    MapComponent,
    EarthComponent,
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
  ],
  providers: [AppService],
  bootstrap: [AppComponent],
})
export class AppModule {}

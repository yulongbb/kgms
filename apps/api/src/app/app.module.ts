import { Module } from '@nestjs/common';

import { SchemaModule } from './schema/schema.module';
import { PropertyModule } from './property/property.module';
import { Datasetodule } from './dataset/dataset.module';
import { EntityModule } from './entity/entity.module';

@Module({
  imports: [
    Datasetodule,
    SchemaModule,
    PropertyModule,
    EntityModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}


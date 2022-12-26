import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EntityService } from './entity.service';
import { Entity, EntitySchema } from './entity.schema';
import { EntityResolver } from './entity.resolver';
import { EntityController } from './entity.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Entity.name, schema: EntitySchema }])],
  controllers: [EntityController],
  providers: [EntityService, EntityResolver],
})
export class EntityModule {}

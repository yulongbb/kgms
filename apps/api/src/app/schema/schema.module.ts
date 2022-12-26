import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchemaService } from './schema.service';
import { Schema } from './schema.entity';
import { SchemaResolver } from './schema.resolver';
import { SchemaController } from './schema.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Schema]),],
  controllers: [SchemaController],
  providers: [SchemaService,SchemaResolver],
})
export class SchemaModule { }

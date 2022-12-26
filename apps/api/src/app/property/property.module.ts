import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './property.entity';
import { PropertyResolver } from './property.resolver';
import { PropertyService } from './property.service';

@Module({
  imports: [TypeOrmModule.forFeature([Property]),],
  providers: [PropertyService, PropertyResolver],
})
export class PropertyModule { }

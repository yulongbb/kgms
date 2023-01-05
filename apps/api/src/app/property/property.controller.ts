import { Body, Controller, Get, Post } from '@nestjs/common';
import { Property } from './property.entity';
import { PropertyService } from './property.service';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post()
  async create(@Body() property: any): Promise<Property> {
    return await this.propertyService.create(property);
  }

  @Get()
  async findAll(): Promise<Property[]> {
    return this.propertyService.findAll();
  }
}

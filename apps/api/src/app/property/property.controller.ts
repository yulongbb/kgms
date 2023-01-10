import { Body, Controller, Get, Post, Query, Param } from '@nestjs/common';
import { Property } from './property.entity';
import { PropertyService } from './property.service';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post(':id')
  async create(
    @Param('id') id: string,
    @Body() property: any
  ): Promise<Property> {
    property.schemas = [{ id: Number(id) }];
    return await this.propertyService.create(property);
  }

  @Get()
  async findAll(@Query() query?: { term: string }): Promise<Property[]> {
    console.log(query);
    if (query.term) {
      return this.propertyService.findByName(query.term);
    }
    return this.propertyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    return this.propertyService.findOne(id.replace('P', ''));
  }
}

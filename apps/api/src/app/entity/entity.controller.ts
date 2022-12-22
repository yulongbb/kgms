import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { EntityService } from './entity.service';
import { CreateEntityDto, Entity } from './entity.schema';

@Controller('entity')
export class EntityController {
  constructor(private readonly entityService: EntityService) {}

  @Post()
  async create(@Body() createEntityDto: CreateEntityDto) {
    await this.entityService.create(createEntityDto);
  }

  @Get()
  async findAll(): Promise<Entity[]> {
    return this.entityService.findAll();
  }

  @Get('/wikidata/:id')
  async findbyId(@Param('id') id: number): Promise<Entity[]> {
    return this.entityService.findEntitiesById(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Entity> {
    return this.entityService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.entityService.delete(id);
  }
}

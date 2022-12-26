import { Body, Controller, Get, Post } from '@nestjs/common';
import { Schema } from './schema.entity';
import { SchemaService } from './schema.service';

@Controller('/schemas')
export class SchemaController {
  constructor(private schemaService: SchemaService) {}

  /**
   * 新增图谱或概念
   * @param createSchemaDto 
   */
  @Post()
  async create(@Body() createSchemaDto: any) {
    await this.schemaService.create(createSchemaDto);
  }


  /**
   * 查询所有图谱信息
   * @returns 
   */
  @Get()
  async schemas(): Promise<Schema[]> {
    const schemas = await this.schemaService.findAll();
    return schemas;
  }


}

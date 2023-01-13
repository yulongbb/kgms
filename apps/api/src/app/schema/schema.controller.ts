import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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
  async create(@Body() createSchemaDto: any): Promise<Schema>  {
   return await this.schemaService.create(createSchemaDto);
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


  /**
   * 查询单个图谱信息
   * @param id 
   * @returns 
   */
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Schema> {
    return this.schemaService.findTree(id);
  }



  @Delete(':id')
  async delete(@Param('id') id: number): Promise<Schema> {
    return this.schemaService.delete(id);
  }

  @Put(':id/:eid')
  async updateWikidataUrl(@Param('id')id: number,@Param('eid') eid: string): Promise<Schema> {
    return this.schemaService.updateWikidataUrl(id,eid );
  }



}

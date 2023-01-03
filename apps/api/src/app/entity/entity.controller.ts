import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j';

@Controller('entity')
export class EntityController {
  constructor(private readonly neo4jService: Neo4jService) {}

  @Post()
  async create(@Body() triple: any): Promise<any> {
    return await this.neo4jService.write(
      `MERGE (subject:Item {label: ${JSON.stringify(
        triple.subject
      )}}) WITH subject MERGE (object:Item {label: ${JSON.stringify(
        triple.object
      )}}) WITH object MATCH (subject:Item),(object:Item) WHERE subject.label = ${JSON.stringify(
        triple.subject
      )} AND object.label = ${JSON.stringify(
        triple.object
      )} CREATE  (subject) -[r:${triple.predicate}]-> (object) RETURN r`
    );
  }

  /**
   * 查询单个节点信息
   * @param id
   * @returns
   */
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<any> {
    const entity = {};
    const data = await this.neo4jService.read(
      `MATCH (subject:Item)-[predicate]-(object) WHERE ID(subject)=317 RETURN subject, predicate, object`
    );
    entity['id'] = data['records'][0]['_fields'][0]['identity']['low'];
    entity['labels'] = {};
    entity['labels']['zh-cn'] = data['records'][0]['_fields'][0]['properties'];

    const statements = {};
    data['records'].forEach((record: any) => {
      if (!statements[record['_fields'][1]['type']]) {
        statements[record['_fields'][1]['type']] = [];
      }
      statements[record['_fields'][1]['type']].push({
        type: 'statement',
        id: record['_fields'][1]['identity']['low'],
        mainsnak: {
          datavalue: {
            value: {
              "entity-type": "item",
              id: record['_fields'][2]['identity']['low'],
            }
          },
        },
      });
    });
    entity['claims'] = statements;
    return entity;
  }
}

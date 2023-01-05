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

  @Get('')
  async findAll(): Promise<any> {
    const nodes = await this.neo4jService.read(
      `MATCH (node:Item) RETURN node LIMIT 100`
    );
    return nodes['records'];
  }

  /**
   * 查询单个节点信息
   * @param id
   * @returns
   */
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    const entity = {};
    const node = await this.neo4jService.read(
      `MATCH (subject:Item) WHERE ID(subject)=${id.replace(
        'Q',
        ''
      )} RETURN subject`
    );
    entity['id'] = `Q${node['records'][0]['_fields'][0]['identity']['low']}`;
    entity['labels'] = {};
    entity['labels']['zh-cn'] = {
      language: 'zh-cn',
      value: node['records'][0]['_fields'][0]['properties']['label'],
    };
    entity['descriptions'] = {};
    entity['descriptions']['zh-cn'] = {
      language: 'zh-cn',
      value: node['records'][0]['_fields'][0]['properties']['label'],
    };
    entity['aliases'] = {};
    entity['aliases']['zh-cn'] = [];
    entity['aliases']['zh-cn'].push({
      language: 'zh-cn',
      value: node['records'][0]['_fields'][0]['properties']['label'],
    });

    entity['modified'] = new Date();
    entity['type'] = 'type';

    const relations = await this.neo4jService.read(
      `MATCH (subject:Item)-[predicate]->(object) WHERE ID(subject)=${id.replace(
        'Q',
        ''
      )} RETURN subject, predicate, object`
    );

    const statements = {};
    relations['records']?.forEach((record: any) => {
      if (!statements[record['_fields'][1]['type']]) {
        statements[record['_fields'][1]['type']] = [];
      }
      statements[record['_fields'][1]['type']].push({
        mainsnak: {
          snaktype: 'value',
          property: record['_fields'][1]['type'],
          datavalue: {
            value: {
              'entity-type': 'item',
              'numeric-id': record['_fields'][2]['identity']['low'],
              id: `Q${record['_fields'][2]['identity']['low']}`,
            },
            type: 'entityid',
          },
          datatype: 'item',
        },
        type: 'statement',
        id: `Q${node['records'][0]['_fields'][0]['identity']['low']}$${record['_fields'][1]['identity']['low']}`,
        rank: 'normal',
      });
    });
    entity['claims'] = statements;
    return entity;
  }
}

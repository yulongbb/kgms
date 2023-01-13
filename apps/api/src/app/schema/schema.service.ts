import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schema } from './schema.entity';
import { DataSource, DataSourceOptions, TreeRepository } from 'typeorm';
import { Property } from '../property/property.entity';

const options: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'kgms',
  logging: ['query', 'error'],
  synchronize: true,
  entities: [Schema, Property],
};

@Injectable()
export class SchemaService {
  constructor(
    @InjectRepository(Schema)
    private readonly schemasRepository: TreeRepository<Schema>
  ) {}

  create(createSchemaDto: any): Promise<Schema> {
    if (createSchemaDto.parent) {
      return this.schemasRepository
        .findOneBy({ id: createSchemaDto.parent })
        .then((schema) => {
          createSchemaDto.parent = schema;
          return this.schemasRepository.save(createSchemaDto);
        });
    } else {
      return this.schemasRepository.save(createSchemaDto);
    }
  }

  async findAll(): Promise<Schema[]> {
    const dataSource = new DataSource(options);
    return await dataSource
      .initialize()
      .then((dataSource) => {
        return dataSource.getTreeRepository(Schema).findRoots();
      })
      .finally(() => {
        dataSource.destroy();
      });
  }

  async findByName(name: string): Promise<Schema[]> {
    return await this.schemasRepository.find({
      where: [{ nameZh: name }],
      relations: {
        properties: true,
      },
    });
  }

  async findId(id: number): Promise<Schema[]> {
    return await this.schemasRepository.find({
      where: [{ id: id }],
      relations: {
        properties: true,
      },
    });
  }

  async findTree(id: number): Promise<Schema> {
    const dataSource = new DataSource(options);
    return await dataSource.initialize().then((dataSource) => {
      return this.schemasRepository.findOneBy({ id: id }).then((schema) => {
        return dataSource.getTreeRepository(Schema).findDescendantsTree(schema);
      });
    });
  }

  delete(id: number): Promise<any> {
    return this.schemasRepository.delete(id);
  }

  async updateWikidataUrl(id: number, eid: string): Promise<Schema> {
    return await this.schemasRepository.findOneBy({ id: id }).then((schema) => {
      schema.wikidataUrl = eid;
      return this.schemasRepository.save(schema);
    });
  }
}

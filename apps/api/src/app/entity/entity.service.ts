import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEntityDto, Entity, EntityDocument } from './entity.schema';
import { v4 as uuidv4 } from 'uuid';
import { Neo4jService } from 'nest-neo4j';

@Injectable()
export class EntityService {
  constructor(
    @InjectModel(Entity.name)
    private readonly entityModel: Model<EntityDocument>,
    private readonly neo4jService: Neo4jService
  ) {}

  async create(createEntityDto: CreateEntityDto): Promise<Entity> {
    if (!createEntityDto.id) {
      createEntityDto.id = uuidv4();
    }
    if (!(await this.entityModel.exists({ id: createEntityDto.id }))) {
      // this.neo4jService.write(`CREATE (n:Item {id: ${JSON.stringify(createEntityDto.id)}, label: ${JSON.stringify(createEntityDto?.labels?.zh?.value)}, title: ${JSON.stringify(createEntityDto?.descriptions?.zh?.value)}})`);
      return await this.entityModel.create(createEntityDto);
    }
    return await this.entityModel.findOneAndUpdate(
      { id: createEntityDto.id },
      createEntityDto
    );
  }

  async findAll(): Promise<Entity[]> {
    return this.entityModel.find().exec();
  }

  async findEntitiesById(id: number): Promise<Entity[]> {
    return this.entityModel.find({ wikidataid: id }).exec();
  }

  async findOne(id: string): Promise<Entity> {
    return this.entityModel.findOne({ id: id }).exec();
  }

  async delete(id: string) {
    const deletedEntity = await this.entityModel
      .findByIdAndRemove({ id: id })
      .exec();
    return deletedEntity;
  }
}

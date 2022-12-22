import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Neo4jService } from "nest-neo4j";
import { runInThisContext } from "vm";
import { CreateEntityDto, Entity } from "./entity.schema";
import { EntityService } from "./entity.service";

@Resolver(of => Entity)
export class EntityResolver {

  constructor(
    private readonly entityService: EntityService,
    private readonly neo4jService: Neo4jService
  ) { }

  @Mutation(() => Entity, { name: 'createEntity' })
  async createEntity(@Args('data') createEntityDto: CreateEntityDto): Promise<Entity> {
    return this.entityService.create(createEntityDto);
  }

  @Query(returns => [Entity])
  async entities(): Promise<Entity[]> {
    return await this.entityService.findAll();
  }


  @Query(returns => [Entity])
  async getEntitiesById(@Args('id') id: number): Promise<Entity[]> {
    const res = await this.neo4jService.read(`MATCH (n) RETURN n AS count`);
    return await this.entityService.findEntitiesById(id);
  }

  @Query(returns => Entity)
  async entity(@Args('id') id: string): Promise<Entity> {
    return await this.entityService.findOne(id);
  }


  @Mutation(returns => Entity, { nullable: true })
  async removeEntity(
    @Args({ name: 'entityId', type: () => String }) entityId: string,
  ) {
    return this.entityService.delete(entityId);
  }

}
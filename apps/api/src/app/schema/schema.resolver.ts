import { Args, Query, Resolver } from "@nestjs/graphql";
import { Schema } from "./schema.entity";
import { SchemaService } from "./schema.service";

@Resolver(of => Schema)
export class SchemaResolver {

    constructor(private readonly schemaService: SchemaService) { }

    @Query(returns => Schema)
    async schema(@Args('id') id: number): Promise<Schema> {
        const schema = await this.schemaService.findId(id);
        return schema[0];
    }


    @Query(returns => Schema)
    async findTree(@Args('id') id: number): Promise<Schema> {
        const schema = await this.schemaService.findTree(id);
        return await this.schemaService.findTree(id);
    }


    @Query(returns => Schema)
    async findSchemaByName(@Args('name') name: string): Promise<Schema> {
        const schema = await this.schemaService.findByName(name);
        return schema[0];
    }


    @Query(returns => [Schema])
    async schemas(): Promise<Schema[]> {
        const schemas = await this.schemaService.findAll();
        return schemas;
    }



}
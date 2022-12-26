import { Module } from '@nestjs/common';

import { Neo4jModule } from 'nest-neo4j'
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchemaModule } from './schema/schema.module';
import { PropertyModule } from './property/property.module';
import { Datasetodule } from './dataset/dataset.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EntityModule } from './entity/entity.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      // transformSchema: schema => upperDirectiveTransformer(schema, 'upper'),
      // installSubscriptionHandlers: true,
      // buildSchemaOptions: {
      //   directives: [
      //     new GraphQLDirective({
      //       name: 'upper',
      //       locations: [DirectiveLocation.FIELD_DEFINITION]
      //     })
      //   ]
      // }
    }),
    Neo4jModule.forRoot({
      scheme: 'neo4j',
      host: 'localhost',
      port: 7687,
      username: 'neo4j',
      password: 'eszrdxtfc'
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'monorepo',
      synchronize: true,
      autoLoadEntities: true,
    }),
    MongooseModule.forRoot(
      'mongodb://root:root@localhost:27017/wikidata?authSource=admin'
    ),
    EntityModule,
    SchemaModule,
    PropertyModule,
    Datasetodule,
    FileModule
    // EntitiesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}


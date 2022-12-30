import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { SchemaModule } from './schema/schema.module';
import { PropertyModule } from './property/property.module';
import { Datasetodule } from './dataset/dataset.module';

@Module({
  imports: [
 
    // Neo4jModule.forRoot({
    //   scheme: 'neo4j',
    //   host: 'localhost',
    //   port: 7687,
    //   username: 'neo4j',
    //   password: 'eszrdxtfc'
    // }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'kgms',
      synchronize: true,
      autoLoadEntities: true,
    }),
    Datasetodule,
    SchemaModule,
    PropertyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}


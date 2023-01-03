import { Module } from '@nestjs/common';
import { EntityController } from './entity.controller';
import { Neo4jModule } from 'nest-neo4j';

@Module({
  imports: [
    Neo4jModule.forRoot({
      scheme: 'neo4j',
      host: 'localhost',
      port: 7687,
      username: 'neo4j',
      password: 'eszrdxtfc',
    }),
  ],
  controllers: [EntityController],
})
export class EntityModule {}

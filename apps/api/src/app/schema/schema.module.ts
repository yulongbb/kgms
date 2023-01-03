import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchemaService } from './schema.service';
import { Schema } from './schema.entity';
import { SchemaResolver } from './schema.resolver';
import { SchemaController } from './schema.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'kgms',
      entities: [Schema],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([Schema]),
  ],
  controllers: [SchemaController],
  providers: [SchemaService, SchemaResolver],
})
export class SchemaModule {}

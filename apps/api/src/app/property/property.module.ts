import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyController } from './property.controller';
import { Property } from './property.entity';
import { PropertyService } from './property.service';

@Module({
  imports: [TypeOrmModule.forFeature([Property]),
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'kgms',
    entities: [],
    synchronize: true,
    autoLoadEntities: true,
  }),],
  controllers: [PropertyController],
  providers: [PropertyService],
})
export class PropertyModule { }

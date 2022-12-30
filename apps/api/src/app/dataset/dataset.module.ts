import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dataset } from './dataset.entity';
import { DatasetService } from './dataset.service';
import { DatasetController } from './dataset.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Dataset]),],
  controllers: [DatasetController],
  providers: [DatasetService],
})
export class Datasetodule { }

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dataset } from './dataset.entity';
import { DatasetResolver } from './dataset.resolver';
import { DatasetService } from './dataset.service';

@Module({
  imports: [TypeOrmModule.forFeature([Dataset]),],
  providers: [DatasetService, DatasetResolver],
})
export class Datasetodule { }

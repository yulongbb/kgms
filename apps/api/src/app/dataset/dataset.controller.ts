import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DatasetService } from './dataset.service';
import { Dataset } from './dataset.entity';

@Controller('dataset')
export class DatasetController {

    constructor(private readonly datasetService: DatasetService) { }

    @Get()
    async findAll(): Promise<Dataset[]> {
      return this.datasetService.findAll();
    }
}
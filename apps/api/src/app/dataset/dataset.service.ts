import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateDatasetDto, Dataset } from "./dataset.entity";

@Injectable()
export class DatasetService {

  constructor(
    @InjectRepository(Dataset)
    private readonly datasetRepository: Repository<Dataset>,
  ) { }

  create(createDatasetDto: CreateDatasetDto): Promise<Dataset> {
    return this.datasetRepository.save(createDatasetDto);
  }

  async findAll(): Promise<Dataset[]> {
    return this.datasetRepository.find();
  }

  findId(id: number): Promise<Dataset> {
    return this.datasetRepository.findOneBy({ id: id });
  }

  async remove(id: number): Promise<Dataset> {
    const dataset = this.datasetRepository.findOneBy({ id: id })
    await this.datasetRepository.delete(id);
    return dataset;
  }
}
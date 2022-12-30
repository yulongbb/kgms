import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Dataset } from "./dataset.entity";

@Injectable()
export class DatasetService {

  constructor(
    @InjectRepository(Dataset)
    private readonly datasetRepository: Repository<Dataset>,
  ) { }

  async findAll(): Promise<Dataset[]> {
    return this.datasetRepository.find();
  }

}
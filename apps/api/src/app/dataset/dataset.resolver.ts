import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { In } from "typeorm";
import { CreateDatasetDto, Dataset } from "./dataset.entity";
import { DatasetService } from "./dataset.service";

@Resolver(of => Dataset)
export class DatasetResolver {

    constructor(private readonly datasetService: DatasetService) { }

    @Mutation(() => Dataset, { name: 'createDataset'})
    async createDataset(@Args('data') createDatasetDto: CreateDatasetDto): Promise<Dataset> {
      return this.datasetService.create(createDatasetDto);
    }

    @Query(returns => [Dataset])
    async datasets(): Promise<Dataset[]> {
        return await this.datasetService.findAll();
    }

    @Query(returns => Dataset)
    async dataset(@Args('id') id: number): Promise<Dataset> {
        return await this.datasetService.findId(id);
    }

 

    @Mutation(returns => Dataset, { nullable: true })
    async removeDataset(
      @Args({ name: 'datasetId', type: () => Int }) datasetId: number,
    ) {
      return this.datasetService.remove(datasetId);
    }
    
}
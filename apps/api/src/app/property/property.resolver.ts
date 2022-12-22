import { Args, Query, Resolver } from "@nestjs/graphql";
import { Property } from "./property.entity";
import { PropertyService } from "./property.service";

@Resolver(of => Property)
export class PropertyResolver {

    constructor(private readonly propertyService: PropertyService) { }

    @Query(returns => [Property])
    async properties(): Promise<Property[]> {
        const properties = await this.propertyService.findAll();
        return properties;
    }


    
    
}
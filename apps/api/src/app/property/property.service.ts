import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { Property } from './property.entity';



@Injectable()
export class PropertyService {


  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: TreeRepository<Property>,

  ) { }

  async create(property: any): Promise<Property> {
    const p = await this.propertyRepository.findOneBy({ 'name': property.name })
    console.log(p)
    if(p){
      property.id = p.id;
    }
    property.schemas = [{id:1}];
    return this.propertyRepository.save(property)
  }

  findByName(name: any): Promise<Property> {
    return this.propertyRepository.findOneBy({ 'name': name });
  }

  findAll(): Promise<Property[]> {
    return this.propertyRepository.find();
  }
}

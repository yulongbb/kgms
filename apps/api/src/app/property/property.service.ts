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

  create(createPropertyDto: any): Promise<Property> {
    if (createPropertyDto.subPropertyOf) {
      return this.propertyRepository.findOneBy({ id: createPropertyDto.subPropertyOf }).then((property) => {
        createPropertyDto.subPropertyOf = property;
        return this.propertyRepository.save(createPropertyDto);
      });
    } else {
      return this.propertyRepository.save(createPropertyDto);
    }
  }

  findByName(name: any): Promise<Property> {
    return this.propertyRepository.findOneBy({ 'nameZh': name });
  }

  findAll(): Promise<Property[]> {
    return this.propertyRepository.find();
  }
}

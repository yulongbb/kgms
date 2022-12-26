import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Tree,
  Column,
  PrimaryGeneratedColumn,
  TreeChildren,
  TreeParent,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Property } from '../property/property.entity';

@ObjectType()
@Entity()
@Tree('materialized-path')
export class Schema {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ nullable: true })
  category: string;

  @Field()
  @Column({ nullable: true })
  name: string;

  @Field()
  @Column('text', { nullable: true })
  description: string;

  @Field()
  @Column({ nullable: true })
  nameZh: string;

  @Field()
  @Column('text', { nullable: true })
  descriptionZh: string;

  @TreeParent()
  parent: Schema;

  @Field(() => [Schema])
  @TreeChildren()
  children: Schema[];

  @Field(() => [Property])
  @ManyToMany(() => Property, (property) => property.schemas)
  @JoinTable()
  properties: Property[];

  @Field()
  @Column({ nullable: true })
  wikidataUrl: string;

  @Field()
  @Column({ nullable: true })
  schemaorgUrl: string;

  @Field()
  @Column({ nullable: true })
  version: string;

 
}

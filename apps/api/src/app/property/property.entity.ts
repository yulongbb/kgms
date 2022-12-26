import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, Tree, TreeParent, TreeChildren } from "typeorm";
import { Schema } from "../schema/schema.entity";

@ObjectType()
@Entity()
@Tree("materialized-path")
export class Property {

  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  category: string;

  @Field()
  @Column()
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
  subPropertyOf: Property;

  @Field()
  @Column({ nullable: true })
  schemaorgUrl: string;

  @Field()
  @Column({ nullable: true })
  wikidataUrl: string;

  @TreeChildren()
  subproperties: Property[];

  @Field()
  @Column()
  version: string;

  @ManyToMany(() => Schema, (schema) => schema.properties)
  schemas: Schema[]
}
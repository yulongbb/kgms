import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, Tree, TreeParent, TreeChildren } from "typeorm";
import { Schema } from "../schema/schema.entity";

@ObjectType()
@Entity()
export class Property {

  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;


  @ManyToMany(() => Schema, (schema) => schema.properties)
  schemas: Schema[]
}
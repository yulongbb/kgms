import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'dataset_dataset' })
export class Dataset {

  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({
    nullable: false,
  })
  content: string;

  @Field()
  @Column({
    nullable: true,
  })
  docfile: string

  @Field()
  @Column({
    nullable: true,
  })
  size: number
}


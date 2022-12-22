import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Dataset {

  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  type: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column({
    nullable: true,
  })
  content: string;

  @Field()
  @Column({
    type: "longblob",
    nullable: true,
  })
  data: string

  @Field()
  @Column({
    nullable: true,
  })
  mimeType: string

  @Field()
  @Column({
    nullable: true,
  })
  size: string;

  @CreateDateColumn({
    nullable: true,
  })
  dateCreated: Date;

  @UpdateDateColumn({
    nullable: true,
  })
  dateUpdated: Date;
}



@InputType()
export class CreateDatasetDto {

  @Field({ nullable: false })
  type: string;

  @Field({ nullable: false })
  title: string;

  @Field()
  content: string;
}


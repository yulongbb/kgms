import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { GraphQLJSONObject } from 'graphql-type-json'

export type EntityDocument = Entity & Document;

@ObjectType()
@Schema({ collection: 'entity' })
export class Entity {

  @Field({
    nullable: true,
  })
  @Prop()
  id: string;

  @Field({
    nullable: true,
  })

  @Field({
    nullable: true,
  })
  @Prop()
  type: string;

  @Field(() => GraphQLJSONObject, {
    nullable: true,
  })
  @Prop({ type: {} })
  labels: any;

  @Field(() => GraphQLJSONObject, {
    nullable: true,
  })
  @Prop({ type: {} })
  descriptions: any;


  @Field(() => GraphQLJSONObject, {
    nullable: true,
  })
  @Prop({ type: {} })
  aliases: any;

  @Field(() => GraphQLJSONObject, {
    nullable: true,
  })
  @Prop({ type: {} })
  claims: any;

  @Field(() => GraphQLJSONObject, {
    nullable: true,
  })
  @Prop({ type: {} })
  sitelinks: any;

  @Field(() => GraphQLJSONObject, {
    nullable: true,
  })
  @Prop({ type: {} })
  genes: any;

  @Field({
    nullable: true,
  })
  @Prop({ type: Date })
  modified: Date;

}

export const EntitySchema = SchemaFactory.createForClass(Entity);

@InputType()
export class CreateEntityDto {
  @Field({
    nullable: true,
  })
  id: string;
  @Field({
    nullable: true,
  })
  readonly type: string;
  @Field(() => GraphQLJSONObject,{
    nullable: true,
  })
  readonly labels: any;
  @Field(() => GraphQLJSONObject,{
    nullable: true,
  })
  readonly descriptions: any;
  @Field(() => GraphQLJSONObject,{
    nullable: true,
  })
  readonly aliases: any;
  @Field(() => GraphQLJSONObject,{
    nullable: true,
  })
  readonly claims: any;
  @Field(() => GraphQLJSONObject,{
    nullable: true,
  })
  readonly sitelinks: any;
  @Field(() => GraphQLJSONObject,{
    nullable: true,
  })
  readonly genes: any;
  @Field({
    nullable: true,
  })
  readonly modified: Date;

}

import { Field, ID, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class ProductsModel {
  @Field(() => ID)
  _id?: String;

  @Field({ nullable: true })
  name?: String;

  @Field({ nullable: true })
  brand?: String;

  @Field({ nullable: true })
  title?: String;

  @Field({ nullable: true })
  desc?: String;

  @Field({ nullable: true })
  productCategory?: String;

  @Field({ nullable: true })
  shoe?: String;

  @Field(() => Int)
  retail: Number;

  @Field({ nullable: true })
  releaseDate?: String;

  @Field({ nullable: true })
  colorway?: String;

  @Field({ nullable: true })
  image?: String;

  @Field({ nullable: true })
  urlKey?: String;

  @Field({ nullable: true })
  gender?: String;
}

import { Field, ID, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class CartsModel {
  @Field(() => ID)
  _id: string;

  @Field(() => ID)
  uid: string;

  @Field(() => String)
  name: String;

  @Field(() => String)
  brand: String;

  @Field(() => String)
  @Field(() => String)
  title: String;

  @Field(() => String)
  desc: String;

  @Field(() => String)
  productCategory: String;

  @Field(() => String)
  shoe: String;

  @Field(() => Int)
  retail: Number;

  @Field(() => String)
  image: String;

  @Field(() => String)
  quantity: Number;
}

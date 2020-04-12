// Nestjs convention DTO (data transfer object) - https://docs.nestjs.com/controllers#request-payloads

import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ProductsModel } from '../products.model';

@ObjectType()
export class ProductsPaginationDto {
  @Field(() => Int)
  totalCounts: number;

  @Field(() => [ProductsModel])
  products: ProductsModel[];
}

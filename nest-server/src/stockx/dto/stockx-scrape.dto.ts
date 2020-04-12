// Nestjs convention DTO (data transfer object) - https://docs.nestjs.com/controllers#request-payloads

import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class StockxScrapeDto {
  @Field(() => Boolean, { nullable: true })
  ok: Boolean;

  @Field(() => String, { nullable: true })
  message: String;
}

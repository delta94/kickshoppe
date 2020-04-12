import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/graphql/graphql.guard';
import { ProductsPaginationDto } from './dto/products-pagination.dto';

@Resolver()
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Query(() => ProductsPaginationDto)
  async productsPagination(
    @Args('search', { type: () => String }) search: string,
    @Args('brand', { type: () => String, nullable: true }) brand: string,
    @Args('limit', { type: () => Int, nullable: true }) limit: number,
    @Args('skip', { type: () => Int, nullable: true }) skip: number,
  ): Promise<ProductsPaginationDto> {
    const totalCounts = await this.productsService.countsBySearchBrand(
      search,
      brand,
    );

    const products = await this.productsService.limitPagination(
      limit,
      skip,
      search,
      brand,
    );

    return {
      totalCounts,
      products,
    };
  }
}

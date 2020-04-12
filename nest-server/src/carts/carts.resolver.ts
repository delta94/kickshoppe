import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CartsService } from './carts.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/graphql/graphql.guard';
import { CurrentUser } from 'src/users/users.decorator';
import { CurrentUserDto } from 'src/users/dto/current-user.dto';
import { ResponseStatus } from 'src/common/dto/response-status.dto';

@Resolver()
export class CartsResolver {
  constructor(private cartsService: CartsService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => ResponseStatus)
  async getCartByUserId(@CurrentUser() user: CurrentUserDto) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => ResponseStatus)
  async addCart(@CurrentUser() user: CurrentUserDto) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => ResponseStatus)
  async deleteCartByUserId(@CurrentUser() user: CurrentUserDto) {}
}

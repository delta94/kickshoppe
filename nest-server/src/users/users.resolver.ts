import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UsersModel } from './users.model';
import { CreateUserInputDto } from './dto/create-user.input.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/graphql/graphql.guard';
import { CurrentUser } from './users.decorator';
import { CurrentUserDto } from './dto/current-user.dto';

@Resolver()
export class UsersResolver {
  constructor(private userService: UsersService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [UsersModel], { name: 'users' })
  async users() {
    return this.userService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => UsersModel)
  async userById(@CurrentUser() user: CurrentUserDto) {
    return this.userService.findOneById(user._id);
  }

  @Mutation(() => UsersModel)
  async register(@Args('input') input: CreateUserInputDto) {
    return this.userService.create(input);
  }
}

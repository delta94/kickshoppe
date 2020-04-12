/**
 * Service:
 * NestJs convention of injecting services e.g with Mongoose.
 */

import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UsersModel } from './users.model';
import { CreateUserInputDto } from './dto/create-user.input.dto';
import { BadRequestException } from '@nestjs/common';
import { ErrorMessage } from 'src/common/enums/error-message';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<UsersModel>) {}

  async checkUserEmailExist(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!!user) {
      throw new Error(ErrorMessage.EMAIL_EXIST);
    }
  }

  async create(input: CreateUserInputDto): Promise<UsersModel | null> {
    await this.checkUserEmailExist(input.email);
    const createdUser = new this.userModel(input);
    return createdUser.save();
  }

  async findAll(): Promise<UsersModel[] | null> {
    return this.userModel.find().exec();
  }

  async findOneById(_id: string): Promise<UsersModel | null> {
    return this.userModel.findById(_id).exec();
  }

  async findOneByEmail(email: string): Promise<UsersModel | null> {
    return this.userModel.findOne({ email }).exec();
  }
}

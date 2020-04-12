/**
 * Service:
 * NestJs convention of injecting services e.g with Mongoose.
 */

import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CartsModel } from './carts.model';
import { CreateUserInputDto } from './dto/create-user.input.dto';
import { BadRequestException } from '@nestjs/common';
import { ErrorMessage } from 'src/common/enums/error-message';

@Injectable()
export class CartsService {
  constructor(@InjectModel('Cart') private cartsMddel: Model<CartsModel>) {}
}

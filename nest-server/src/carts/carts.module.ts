import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartsResolver } from './carts.resolver';
import { CartSchema } from './carts.schema';
import { CartsService } from './carts.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Cart', schema: CartSchema }])],
  providers: [CartsResolver, CartsService],
  exports: [CartsService],
})
export class CartsModule {}

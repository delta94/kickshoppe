import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsResolver } from './products.resolver';
import { ProductSchema } from './products.schema';
import { ProductsService } from './products.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ],
  providers: [ProductsResolver, ProductsService],
  exports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    ProductsService,
  ],
})
export class ProductsModule {}

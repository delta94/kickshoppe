import { Module, HttpModule, forwardRef } from '@nestjs/common';
import { StockxResolver } from './stockx.resolver';
import { StockxService } from './stockx.service';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [ProductsModule, HttpModule],
  providers: [StockxResolver, StockxService],
  exports: [StockxService],
})
export class StockXModule {}

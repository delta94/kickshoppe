import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { StockxService } from './stockx.service';
import { StockxScrapeDto } from './dto/stockx-scrape.dto';
import fs from 'fs';

@Resolver()
export class StockxResolver {
  constructor(private stockxService: StockxService) {}

  @Query(() => StockxScrapeDto)
  async scrapeStockx(): Promise<StockxScrapeDto> {
    const promises = [];
    const stockXUserName = process.env.STOCKX_USERNAME;
    const stockXPassword = process.env.STOCKX_PASSWORD;
    const TOTAL_PAGE = 30;

    try {
      await this.stockxService.loginToStockx(stockXUserName, stockXPassword);

      for (let i = 0, n = TOTAL_PAGE; i < n; i++) {
        promises.push(
          await this.stockxService.searchStockxProducts(null, {
            page: i,
            productCategory: 'sneakers',
          }),
        );
      }

      const results = await Promise.all(promises);
      const flattenResults = results.flat();
      if (flattenResults.length > 0) {
        fs.writeFileSync('productsList.json', JSON.stringify(flattenResults));
        await this.stockxService.insertMany(flattenResults);
        return {
          ok: true,
          message: 'Successfull!',
        };
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

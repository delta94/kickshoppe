import { InMemoryCache } from 'apollo-cache-inmemory';
import { ResolverResponse } from 'interfaces/ResolverResponse';

export interface ResolverMap {
  [key: string]: (
    root: any,
    args: any,
    context: { cache: InMemoryCache },
    info: any
  ) => Promise<ResolverResponse>;
}

//TODO: improve type schema

const typeDefs = `
    type Product {
      _id: ID
      name: String
      brand: String
      retail: Int
      releaseDate: String
      image: String
      urlKey: String
    }

    type AllProducts {
      products: [Product!]!
      totalCount: Int
    }
  
    type Query {
      getProductsById: Product!
      getProductsByIds: [Product!]!
      getProductsOne: Product!
      getProductsMany: [Product]!
      getProductsLimitPagination(limit: Int, skip: Int, search: String, brand: String ): AllProducts!
      getProductsCount: [Product]!
    }


    schema {
      query: Query
    }
`;

export default typeDefs;

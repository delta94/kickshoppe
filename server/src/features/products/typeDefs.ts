const typeDefs = `
    type Product {
      _id: ID
      name: String
      brand: String
      title: String
      desc: String
      productCategory: String
      shoe: String
      retail: Int
      releaseDate: String
      colorway: String
      image: String
      urlKey: String
      gender: String
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

const typeDefs = `
    type Stockx {
      ok: Boolean!
    }
  
    type Query {
      scrape: Stockx!
    }

    type Mutation {
      createStockxs(task: String!, checked: Boolean!): [Stockx!]!
    }

    schema {
      query: Query
      mutation: Mutation
    }
`;

export default typeDefs;

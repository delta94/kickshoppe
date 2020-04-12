//TODO: improve type schema

const typeDefs = `
    type Cart {
      uid: ID!
      productIds: [ID!]
    }
  
    type Query {
      getCartsByUserId: Cart!
    }

    type Mutation {
      setCartsByUserId(productIds: [ID!]!): Cart!
    }

    schema {
      query: Query
      mutation: Mutation
    }
`;

export default typeDefs;

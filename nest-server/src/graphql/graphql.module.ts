import { GraphQLModule as NestjsGraphQlModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    NestjsGraphQlModule.forRoot({
      context: ({ req, res }) => ({ req, res }),
      autoSchemaFile: 'src/graphql/schema.gql',
      include: [],
    }),
  ],
})
export class GraphQLModule {}

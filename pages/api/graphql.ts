import { ApolloServer, gql } from 'apollo-server-micro';
import GlobalConfig from 'contexts/shared/domain/GlobalConfig';

const typeDefs = gql`
  type Query {
    user: User
  }
  type User {
    name: String!
  }
`;

const resolvers = {
  Query: {
    user(): any {
      // parent, args, ctx
      return { name: 'Nextjs' };
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: GlobalConfig.environment === 'development',
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api/graphql' });

import { makeExecutableSchema } from 'graphql-tools';
import { gql } from 'apollo-server-express';
import {
    typeDefs as userAccountSchema,
    resolvers as userAccountResolver
} from './users/user_schema';

const Query = gql`
    type Query {
        _empty: String
    }
`
const Mutation = gql`
    type Mutation {
        _empty: String
    }
`
export const schema = makeExecutableSchema({
    typeDefs: [Query,
        Mutation,
        userAccountSchema],
    resolvers: [userAccountResolver]
})
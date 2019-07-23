import { makeExecutableSchema } from 'graphql-tools';
import { gql } from 'apollo-server-express';
import {
    typeDefs as userAccountSchema,
    resolvers as userAccountResolver
} from './users/user_schema';
import {
    typeDefs as qrCodeSchema,
    resolvers as qrCodeResolver
} from './qrCodes/qrCodeSchema';

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
        userAccountSchema,
        qrCodeSchema],
    resolvers: [userAccountResolver,qrCodeResolver]
})
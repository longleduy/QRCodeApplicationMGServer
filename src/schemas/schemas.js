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

import {
    typeDefs as logSchema,
    resolvers as logResolver
} from './logs/logSchema';

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
        qrCodeSchema,
        logSchema],
    resolvers: [userAccountResolver,qrCodeResolver,logResolver]
})
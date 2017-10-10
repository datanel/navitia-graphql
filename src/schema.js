const {makeExecutableSchema} = require('graphql-tools');
const resolvers = require('./resolvers');

const typeDefs = `
    interface Generic {
        id: String!
        name: String
    }

    type Coverage implements Generic {
        id: String!
        name: String
        networks: [Network]
    }

    type Network implements Generic {
        id: String!
        name: String!
        codes: [Code]!
    }

    type Code {
        type: String!
        value: String!
    }

    type Query {
        coverages(id: String): [Coverage]
        networks(coverage: String!, id: String): [Network]
    }
`;

module.exports = makeExecutableSchema({typeDefs, resolvers});

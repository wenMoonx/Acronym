"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const schema = (0, graphql_1.buildSchema)(`
    type Query {
      readAcronym(from: Int!, limit: Int!, search: String!): AcronymGroup
    }
    type Mutation {
      createAcronym(acronym: String!, description: String!): Boolean
      updateAcronym(nowAcronym: String!, newAcronym: String!, newDescription: String!): Boolean
      deleteAcronym(deleteAcronym: String!): Boolean
    }
    type Acronym {
        acronym: String!
        description: String!
    }
    type AcronymGroup {
      acronyms: [Acronym]
      isOnly: Boolean!
    }
`);
exports.default = schema;
//# sourceMappingURL=schemas.js.map
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _graphql = require("graphql");
const schema = (0, _graphql.buildSchema)(`
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
const _default = schema;

//# sourceMappingURL=schemas.js.map
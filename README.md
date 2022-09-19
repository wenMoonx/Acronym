# Acronym
graphqlUrl: https://acronym47.herokuapp.com/graphql
swaggerUrl: https://acronym47.herokuapp.com/api-docs

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

# Acronym
graphqlUrl: https://acronym47.herokuapp.com/graphql
swaggerUrl: https://acronym47.herokuapp.com/api-docs

{
  readAcronym(from:0, limit: 10, search: "") {
    acronyms {
      acronym
      description
    },
    isOnly
  }
}

mutation {
  createAcronym(acronym: "YJG", description:"YunJinGwang")
  updateAcronym(nowAcronym: "YJG", newAcronym: "YJ", newDescription: "YunJin")
  deleteAcronym(deleteAcronym: "YJ")
}

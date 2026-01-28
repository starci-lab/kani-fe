import { UserSchema } from "@/modules/types"
import { createApolloClient } from "../clients"
import { GraphQLResponse, QueryParams } from "../types"
import { DocumentNode, gql } from "@apollo/client"

const query1 = gql`
  query User {
    user {
      message
      success
      error
      data {
        id
        mfaEnabled
        email
      }
    }
  }
`

export enum QueryUser {
  Query1 = "query1",
}

const queryMap: Record<QueryUser, DocumentNode> = {
    [QueryUser.Query1]: query1,
}

export type QueryUserParams = QueryParams<QueryUser, UserSchema>;

export const queryUser = async (
    { query = QueryUser.Query1, token }: QueryUserParams
) => {
    if (!token) {
        throw new Error("Token is required")
    }
    const queryDocument = queryMap[query]
    // use no cache credential to include http only cookies
    return await createApolloClient({ token })
        .query<{ user: GraphQLResponse<UserSchema> }>({
            query: queryDocument,
        })
}

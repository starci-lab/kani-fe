import { UserSchema } from "@/modules/types"
import { createApolloClient } from "../clients"
import { GraphQLResponse, QueryParams } from "../types"
import { DocumentNode, gql } from "@apollo/client"

const query1 = gql`
  query UserV2 {
    userV2 {
      message
      success
      error
      data {
        id
        privyUserId
        version
        referralCode
        authenticationFactors
      }
    }
  }
`

export enum QueryUserV2 {
  Query1 = "query1",
}

const queryMap: Record<QueryUserV2, DocumentNode> = {
    [QueryUserV2.Query1]: query1,
}

export type QueryUserV2Params = QueryParams<QueryUserV2, UserSchema>;

export const queryUserV2 = async (
    { query = QueryUserV2.Query1, token }: QueryUserV2Params
) => {
    if (!token) {
        throw new Error("Token is required")
    }
    const queryDocument = queryMap[query]
    // use no cache credential to include http only cookies
    return await createApolloClient({ token, withCredentials: true })
        .query<{ userV2: GraphQLResponse<UserSchema> }>({
            query: queryDocument,
        })
}

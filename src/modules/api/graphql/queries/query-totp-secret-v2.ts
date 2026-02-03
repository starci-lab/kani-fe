import { createApolloClient } from "../clients"
import { GraphQLResponse, QueryParams } from "../types"
import { DocumentNode, gql } from "@apollo/client"

const query1 = gql`
  query TotpSecretV2 {
    totpSecretV2 {
      message
      success
      error
      data {
        totpSecret
        totpSecretUrl
      }
    }
  }
`

export enum QueryTotpSecretV2 {
  Query1 = "query1",
}

const queryMap: Record<QueryTotpSecretV2, DocumentNode> = {
    [QueryTotpSecretV2.Query1]: query1,
}

export interface TotpSecretV2Response {
  totpSecret?: string;
  totpSecretUrl?: string;
}

export type QueryTotpSecretV2Params = QueryParams<QueryTotpSecretV2>;

export const queryTotpSecretV2 = async (
    { query = QueryTotpSecretV2.Query1, token }: QueryTotpSecretV2Params
) => {
    if (!token) {
        throw new Error("Token is required")
    }
    const queryDocument = queryMap[query]
    // use no cache credential to include http only cookies
    return await createApolloClient({ token, withCredentials: true })
        .query<{ totpSecretV2: GraphQLResponse<TotpSecretV2Response> }>({
            query: queryDocument,
        })
}

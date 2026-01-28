import { createApolloClient } from "../clients"
import { GraphQLResponse, QueryParams } from "../types"
import { DocumentNode, gql } from "@apollo/client"

const query1 = gql`
  query TotpSecret {
    totpSecret {
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

export enum QueryTotpSecret {
  Query1 = "query1",
}

const queryMap: Record<QueryTotpSecret, DocumentNode> = {
    [QueryTotpSecret.Query1]: query1,
}

export interface TotpSecretResponse {
  totpSecret: string;
  totpSecretUrl: string;
}

export type QueryTotpSecretParams = QueryParams<QueryTotpSecret>;

export const queryTotpSecret = async (
    { query = QueryTotpSecret.Query1, token }: QueryTotpSecretParams
) => {
    if (!token) {
        throw new Error("Token is required")
    }
    const queryDocument = queryMap[query]
    // use no cache credential to include http only cookies
    return await createApolloClient({ token })
        .query<{ totpSecret: GraphQLResponse<TotpSecretResponse> }>({
            query: queryDocument,
        })
}

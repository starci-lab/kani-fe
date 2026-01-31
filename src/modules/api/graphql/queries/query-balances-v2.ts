import { createApolloClient } from "../clients"
import { GraphQLResponse, QueryParams } from "../types"
import { DocumentNode, gql } from "@apollo/client"

const query1 = gql`
  query BalancesV2($request: BalancesV2Request!) {
    balancesV2(request: $request) {
      message
      success
      error
      data {
        id
        balanceAmount
        balanceAmountDecimal
      }
    }
  }
`

export enum QueryBalancesV2 {
  Query1 = "query1",
}

const queryMap: Record<QueryBalancesV2, DocumentNode> = {
    [QueryBalancesV2.Query1]: query1,
}

export interface BalancesV2Request {
  id: string
}

export interface TokenBalanceV2 {
  id: string
  balanceAmount: string
  balanceAmountDecimal: number
}

export interface BalancesV2Response {
  data: Array<TokenBalanceV2>
}

export type QueryBalancesV2Params = QueryParams<QueryBalancesV2, BalancesV2Request>;

export const queryBalancesV2 = async ({
    query = QueryBalancesV2.Query1,
    token,
    request,
}: QueryBalancesV2Params) => {
    if (!token) {
        throw new Error("Token is required")
    }
    if (!request) {
        throw new Error("Request is required")
    }
    const queryDocument = queryMap[query]
    // use no cache credential to include http only cookies
    return await createApolloClient({ token, withCredentials: true }).query<{
    balancesV2: GraphQLResponse<Array<TokenBalanceV2>>;
  }>({
      query: queryDocument,
      variables: {
          request,
      },
  })
}

import { TransactionSchema } from "@/modules/types"
import { createNoCacheCredentialAuthClientWithToken } from "../clients"
import { GraphQLResponse, QueryParams } from "../types"
import { DocumentNode, gql } from "@apollo/client"

const query1 = gql`
  query Transactions2($request: Transactions2Request!) {
    transactions2(request: $request) {
      message
      success
      error
      data {
        data {
            id
            txHash
            bot
            chainId
            type
            timestamp
        }
        count
      }
    }
  }
`

export enum QueryTransactions2 {
  Query1 = "query1",
}

const queryMap: Record<QueryTransactions2, DocumentNode> = {
    [QueryTransactions2.Query1]: query1,
}

export interface QueryTransactions2Request {
    botId: string;
    filters: Transactions2PaginationPageFilters;
}

export interface Transactions2PaginationPageFilters {
    pageNumber?: number
    limit?: number
}

export interface QueryTransactions2Response {
    data: Array<TransactionSchema>;
    count: number;
}
export type QueryTransactions2Params = QueryParams<QueryTransactions2, QueryTransactions2Request>;

export const queryTransactions2 = async (
    { query = QueryTransactions2.Query1, token, request }: QueryTransactions2Params
) => {
    if (!token) {
        throw new Error("Token is required")
    }
    if (!request) {
        throw new Error("Request is required")
    }
    const queryDocument = queryMap[query]
    // use no cache credential to include http only cookies
    return await createNoCacheCredentialAuthClientWithToken(token)
        .query<{ 
            transactions2: GraphQLResponse<QueryTransactions2Response> 
        }>({
            query: queryDocument,
            variables: {
                request
            },
        })
}

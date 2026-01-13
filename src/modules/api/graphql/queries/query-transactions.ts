import { TransactionSchema } from "@/modules/types"
import { createNoCacheCredentialAuthClientWithToken } from "../clients"
import { GraphQLResponse, QueryParams } from "../types"
import { DocumentNode, gql } from "@apollo/client"

const query1 = gql`
  query Transactions($request: TransactionsRequest!) {
    transactions(request: $request) {
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

export enum QueryTransactions {
  Query1 = "query1",
}

const queryMap: Record<QueryTransactions, DocumentNode> = {
    [QueryTransactions.Query1]: query1,
}

export interface QueryTransactionsRequest {
    botId: string;
    filters: TransactionsPaginationPageFilters;
}

export interface TransactionsPaginationPageFilters {
    pageNumber?: number
    limit?: number
}

export interface QueryTransactionsResponse {
    data: Array<TransactionSchema>;
    count: number;
}
export type QueryTransactionsParams = QueryParams<QueryTransactions, QueryTransactionsRequest>;

export const queryTransactions = async (
    { query = QueryTransactions.Query1, token, request }: QueryTransactionsParams
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
            transactions: GraphQLResponse<QueryTransactionsResponse> 
        }>({
            query: queryDocument,
            variables: {
                request
            },
        })
}

import { TransactionSchema } from "@/modules/types"
import { createNoCacheCredentialAuthClientWithToken } from "../clients"
import { GraphQLResponse, QueryParams } from "../types"
import { DocumentNode, gql } from "@apollo/client"

const query1 = gql`
  query TransactionsV2($request: TransactionsV2Request!) {
    transactionsV2(request: $request) {
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

export enum QueryTransactionsV2 {
  Query1 = "query1",
}

const queryMap: Record<QueryTransactionsV2, DocumentNode> = {
    [QueryTransactionsV2.Query1]: query1,
}

export interface QueryTransactionsV2Request {
    botId: string;
    filters: TransactionsV2PaginationPageFilters;
}

export interface TransactionsV2PaginationPageFilters {
    pageNumber?: number
    limit?: number
    asc?: boolean
}

export interface QueryTransactionsV2Response {
    data: Array<TransactionSchema>;
    count: number;
}
export type QueryTransactionsV2Params = QueryParams<QueryTransactionsV2, QueryTransactionsV2Request>;

export const queryTransactionsV2 = async (
    { query = QueryTransactionsV2.Query1, token, request }: QueryTransactionsV2Params
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
            transactionsV2: GraphQLResponse<QueryTransactionsV2Response> 
        }>({
            query: queryDocument,
            variables: {
                request
            },
        }
        )
}

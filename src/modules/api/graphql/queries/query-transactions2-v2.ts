import { TransactionSchema } from "@/modules/types"
import { createNoCacheCredentialAuthClientWithToken } from "../clients"
import { GraphQLResponse, QueryParams } from "../types"
import { DocumentNode, gql } from "@apollo/client"

const query1 = gql`
  query Transactions2V2($request: Transactions2V2Request!) {
    transactions2V2(request: $request) {
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

export enum QueryTransactions2V2 {
  Query1 = "query1",
}

const queryMap: Record<QueryTransactions2V2, DocumentNode> = {
    [QueryTransactions2V2.Query1]: query1,
}

export interface QueryTransactions2V2Request {
    botId: string;
    filters: Transactions2V2PaginationPageFilters;
}

export interface Transactions2V2PaginationPageFilters {
    pageNumber?: number
    limit?: number
}

export interface QueryTransactions2V2Response {
    data: Array<TransactionSchema>;
    count: number;
}
export type QueryTransactions2V2Params = QueryParams<QueryTransactions2V2, QueryTransactions2V2Request>;

export const queryTransactions2V2 = async (
    { query = QueryTransactions2V2.Query1, token, request }: QueryTransactions2V2Params
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
            transactions2V2: GraphQLResponse<QueryTransactions2V2Response> 
        }>({
            query: queryDocument,
            variables: {
                request
            },
        }
        )
}

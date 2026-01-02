import { BotSchema } from "@/modules/types"
import { createNoCacheCredentialAuthClientWithToken } from "../clients"
import { GraphQLResponse, QueryParams } from "../types"
import { DocumentNode, gql } from "@apollo/client"

const query1 = gql`
  query Bots2($request: Bots2Request!) {
    bots2(request: $request) {
      message
      success
      error
      data {
        count
        data {
            id
            accountAddress
            chainId
            name
            liquidityPools
            initialized
            explorerId
            running
            targetToken
            quoteToken
            snapshotTargetBalanceAmount
            snapshotQuoteBalanceAmount
            snapshotGasBalanceAmount
            lastBalancesSnapshotAt
            isExitToUsdc
            roi24h
            pnl24h
            backupPrivateKey
          }
      }
    }
  }
`

export enum QueryBots2 {
  Query1 = "query1",
}

const queryMap: Record<QueryBots2, DocumentNode> = {
    [QueryBots2.Query1]: query1,
}

export interface Bots2PaginationPageFilters {
  pageNumber?: number
  limit?: number
}
export type QueryBots2Params = QueryParams<QueryBots2, QueryBots2Request>;

export interface QueryBots2Request {
    filters?: Bots2PaginationPageFilters;
}

export interface QueryBots2Response {
    data: Array<BotSchema>;
    count: number;
}

export const queryBots2 = async ({
    query = QueryBots2.Query1,
    token,
    request,
}: QueryBots2Params) => {
    if (!token) {
        throw new Error("Token is required")
    }
    if (!request) {
        throw new Error("Request is required")
    }
    const queryDocument = queryMap[query]
    // use no cache credential to include http only cookies
    return await createNoCacheCredentialAuthClientWithToken(token).query<{
    bots2: GraphQLResponse<QueryBots2Response>;
  }>({
      query: queryDocument,
      variables: {
          request,
      },
  })
}

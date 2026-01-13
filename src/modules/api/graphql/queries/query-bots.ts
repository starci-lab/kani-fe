import { BotSchema } from "@/modules/types"
import { createNoCacheCredentialAuthClientWithToken } from "../clients"
import { GraphQLResponse, QueryParams } from "../types"
import { DocumentNode, gql } from "@apollo/client"

const query1 = gql`
  query Bots($request: BotsRequest!) {
    bots(request: $request) {
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

export enum QueryBots {
  Query1 = "query1",
}

const queryMap: Record<QueryBots, DocumentNode> = {
    [QueryBots.Query1]: query1,
}

export interface BotsPaginationPageFilters {
  pageNumber?: number
  limit?: number
}
export type QueryBotsParams = QueryParams<QueryBots, QueryBotsRequest>;

export interface QueryBotsRequest {
    filters?: BotsPaginationPageFilters;
}

export interface QueryBotsResponse {
    data: Array<BotSchema>;
    count: number;
}

export const queryBots = async ({
    query = QueryBots.Query1,
    token,
    request,
}: QueryBotsParams) => {
    if (!token) {
        throw new Error("Token is required")
    }
    if (!request) {
        throw new Error("Request is required")
    }
    const queryDocument = queryMap[query]
    // use no cache credential to include http only cookies
    return await createNoCacheCredentialAuthClientWithToken(token).query<{
    bots: GraphQLResponse<QueryBotsResponse>;
  }>({
      query: queryDocument,
      variables: {
          request,
      },
  })
}

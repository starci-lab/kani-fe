import { BotSchema } from "@/modules/types"
import { createNoCacheCredentialAuthClientWithToken } from "../clients"
import { GraphQLResponse, QueryParams } from "../types"
import { DocumentNode, gql } from "@apollo/client"

const query1 = gql`
  query BotsV2($request: BotsV2Request!) {
    botsV2(request: $request) {
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

export enum QueryBotsV2 {
  Query1 = "query1",
}

const queryMap: Record<QueryBotsV2, DocumentNode> = {
    [QueryBotsV2.Query1]: query1,
}

export interface BotsV2PaginationPageFilters {
  pageNumber?: number
  limit?: number
}
export type QueryBotsV2Params = QueryParams<QueryBotsV2, QueryBotsV2Request>;

export interface QueryBotsV2Request {
    filters?: BotsV2PaginationPageFilters;
}

export interface QueryBotsV2Response {
    data: Array<BotSchema>;
    count: number;
}

export const queryBotsV2 = async ({
    query = QueryBotsV2.Query1,
    token,
    request,
}: QueryBotsV2Params) => {
    if (!token) {
        throw new Error("Token is required")
    }
    if (!request) {
        throw new Error("Request is required")
    }
    const queryDocument = queryMap[query]
    // use no cache credential to include http only cookies
    return await createNoCacheCredentialAuthClientWithToken(token).query<{
    botsV2: GraphQLResponse<QueryBotsV2Response>;
  }>({
      query: queryDocument,
      variables: {
          request,
      },
  })
}

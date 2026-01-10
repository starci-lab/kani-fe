import { BotSchema } from "@/modules/types"
import { createNoCacheCredentialAuthClientWithToken } from "../clients"
import { GraphQLResponse, QueryParams } from "../types"
import { DocumentNode, gql } from "@apollo/client"

const query1 = gql`
  query Bots2V2($request: Bots2V2Request!) {
    bots2V2(request: $request) {
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

export enum QueryBots2V2 {
  Query1 = "query1",
}

const queryMap: Record<QueryBots2V2, DocumentNode> = {
    [QueryBots2V2.Query1]: query1,
}

export interface Bots2V2PaginationPageFilters {
  pageNumber?: number
  limit?: number
}
export type QueryBots2V2Params = QueryParams<QueryBots2V2, QueryBots2V2Request>;

export interface QueryBots2V2Request {
    filters?: Bots2V2PaginationPageFilters;
}

export interface QueryBots2V2Response {
    data: Array<BotSchema>;
    count: number;
}

export const queryBots2V2 = async ({
    query = QueryBots2V2.Query1,
    token,
    request,
}: QueryBots2V2Params) => {
    if (!token) {
        throw new Error("Token is required")
    }
    if (!request) {
        throw new Error("Request is required")
    }
    const queryDocument = queryMap[query]
    // use no cache credential to include http only cookies
    return await createNoCacheCredentialAuthClientWithToken(token).query<{
    bots2V2: GraphQLResponse<QueryBots2V2Response>;
  }>({
      query: queryDocument,
      variables: {
          request,
      },
  })
}

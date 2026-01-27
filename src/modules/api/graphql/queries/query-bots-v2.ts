import { createNoCacheCredentialAuthClientWithToken } from "../clients"
import { GraphQLResponse, QueryParams } from "../types"
import { DocumentNode, gql } from "@apollo/client"
import { BotSchema } from "@/modules/types"

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
            createdAt
            updatedAt
            accountAddress
            chainId
            user
            name
            liquidityPools
            running
            lastRunAt
            targetToken
            quoteToken
            isExitToUsdc
            performanceDisplayMode
            version
            activePosition {
              id
              type
              liquidityPool
              position
              associatedPosition {
                id
                createdAt
                updatedAt
                openTxHash
                liquidityPool
                bot
                chainId
                positionId
                isActive
                closeTxHash
                metadata
              }
              associatedLiquidityPool {
                id
                createdAt
                updatedAt
                displayId
                dex
                poolAddress
                tokenA
                tokenB
                fee
                chainId
                type
                isActive
                metadata
                url
                wsIdleTimeoutMs
                staleMs
              }
            }
            performance24h {
              roi
              pnl
              roiInUsd
              pnlInUsd
            }
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

export interface BotsV2AssociateOptions {
  activePosition?: {
    liquidityPool?: boolean;
    position?: boolean;
  }
}
export type QueryBotsV2Params = QueryParams<QueryBotsV2, QueryBotsV2Request>;

export interface QueryBotsV2Request {
  filters?: BotsV2PaginationPageFilters;
  associate?: BotsV2AssociateOptions;
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

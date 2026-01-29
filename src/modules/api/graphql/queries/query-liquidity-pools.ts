import {
    LiquidityPoolId,
    LiquidityPoolSchema,
} from "@/modules/types"
import { noCacheClient } from "../clients"
import {
    GraphQLResponse,
    QueryParams,
} from "../types"
import { DocumentNode, gql } from "@apollo/client"

const query1 = gql`
  query LiquidityPools($request: LiquidityPoolsRequest!) {
    liquidityPools(request: $request) {
      success
      message
      error
      data {
        count
        data {
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
            clmmState {
                tickSpacing
                tickMultiplier
            }
            analytics {
                volume24H
                fees24H
                apr24H
                tvl
                liquidity
            }
            dlmmState {
                binStep
                binOffset
                basisPointMax
            }
        }
      }
    }
  }
`

export enum QueryLiquidityPools {
    Query1 = "query1",
}

const queryMap: Record<QueryLiquidityPools, DocumentNode> = {
    [QueryLiquidityPools.Query1]: query1,
}

export enum LiquidityPoolsSortBy {
    Apr = "apr",
    Volume = "volume",
    Fees = "fees",
    Liquidity = "liquidity",
}

export interface QueryLiquidityPoolsRequest {
    filters: Partial<{
        pageNumber: number;
        limit: number;
        tokenIds: Array<string>;
        ids: Array<string>;
        displayIds: Array<LiquidityPoolId>;
        addresses: Array<string>;
        dexIds: Array<string>;
        sortBy: LiquidityPoolsSortBy;
        asc: boolean;
        watchlist: boolean;
        incentivized: boolean;
    }>
}

export type QueryLiquidityPoolsParams = QueryParams<
    QueryLiquidityPools,
    QueryLiquidityPoolsRequest
>

export interface QueryLiquidityPoolsResponse {
    count: number;
    data: Array<LiquidityPoolSchema>
}

export const queryLiquidityPools = async ({
    query = QueryLiquidityPools.Query1,
    request,
}: QueryLiquidityPoolsParams) => {
    if (!request) {
        throw new Error("Request is required")
    }
    const queryDocument = queryMap[query]
    // use no cache credential to include http only cookies
    return await noCacheClient.query<{
        liquidityPools: GraphQLResponse<QueryLiquidityPoolsResponse>;
    }>({
        query: queryDocument,
        variables: {
            request,
        },
    })
}

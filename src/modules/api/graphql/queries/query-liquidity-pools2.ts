import {
    LiquidityPoolId,
    LiquidityPoolSchema,
    TokenId,
} from "@/modules/types"
import { noCacheClient } from "../clients"
import {
    GraphQLResponse,
    QueryParams,
} from "../types"
import { DocumentNode, gql } from "@apollo/client"

const query1 = gql`
  query LiquidityPools2($request: LiquidityPools2Request!) {
    liquidityPools2(request: $request) {
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
          tickSpacing
          binStep
          binOffset
          isActive
          tickMultiplier
          metadata
          url
          basisPointMax
          dynamicInfo {
            tickCurrent
            activeId
            liquidity
            price
            volume24H
            fees24H
            apr24H
            tvl
          }
        }
      }
    }
  }
`

export enum QueryLiquidityPools2 {
    Query1 = "query1",
}

const queryMap: Record<QueryLiquidityPools2, DocumentNode> = {
    [QueryLiquidityPools2.Query1]: query1,
}

export interface QueryLiquidityPools2Request {
    filters: Partial<{
        pageNumber: number;
        limit: number;
        tokenA?: TokenId;
        tokenB?: TokenId;
        ids?: Array<string>;
        displayIds?: Array<LiquidityPoolId>;
        addresses?: Array<string>;
        aprDescending?: boolean;
    }>
}

export type QueryLiquidityPools2Params = QueryParams<
    QueryLiquidityPools2,
    QueryLiquidityPools2Request
>

export interface QueryLiquidityPools2Response {
    count: number;
    data: Array<LiquidityPoolSchema>
}

export const queryLiquidityPools2 = async ({
    query = QueryLiquidityPools2.Query1,
    request,
}: QueryLiquidityPools2Params) => {
    if (!request) {
        throw new Error("Request is required")
    }
    const queryDocument = queryMap[query]
    // use no cache credential to include http only cookies
    return await noCacheClient.query<{
        liquidityPools2: GraphQLResponse<QueryLiquidityPools2Response>;
    }>({
        query: queryDocument,
        variables: {
            request,
        },
    })
}

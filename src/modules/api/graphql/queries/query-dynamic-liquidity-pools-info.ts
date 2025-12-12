import { DocumentNode, gql } from "@apollo/client"
import { GraphQLResponse, QueryParams } from "../types"
import { createNoCacheCredentialAuthClientWithToken } from "../clients"
import { LiquidityPoolId } from "@/modules/types"

export interface DynamicLiquidityPoolInfo {
    id: string
    apr24H?: number
    activeId?: number
    fees24H?: number
    volume24H?: number
    tvl?: number
    liquidity?: number
    tickCurrent?: number
}

const query1 = gql`
  query DynamicLiquidityPoolsInfo($request: DynamicLiquidityPoolsInfoRequest!){
    dynamicLiquidityPoolsInfo(request: $request){
        success
        message
        error
        data {
            id
            apr24H
            activeId
            fees24H
            volume24H
            tvl
            liquidity
            tickCurrent
        }
    }
}`

export enum QueryDynamicLiquidityPoolsInfo {
    Query1 = "query1",
  }
  
const queryMap: Record<QueryDynamicLiquidityPoolsInfo, DocumentNode> = {
    [QueryDynamicLiquidityPoolsInfo.Query1]: query1,
}
  
export interface QueryDynamicLiquidityPoolsInfoResponse {
    dynamicLiquidityPoolsInfo: GraphQLResponse<Array<DynamicLiquidityPoolInfo>>
}

export interface QueryDynamicLiquidityPoolsInfoRequest {
    liquidityPoolIds: Array<LiquidityPoolId>;
}

export type QueryDynamicLiquidityPoolsInfoParams = QueryParams<QueryDynamicLiquidityPoolsInfo, QueryDynamicLiquidityPoolsInfoRequest>;
  
export const queryDynamicLiquidityPoolsInfo = async (
    { query = QueryDynamicLiquidityPoolsInfo.Query1, token, request }: QueryDynamicLiquidityPoolsInfoParams,
) => {
    if (!token) {
        throw new Error("Token is required")
    }
    if (!request) {
        throw new Error("Request is required")
    }
    const queryDocument = queryMap[query]
    // use no cache client to avoid query cache
    return await createNoCacheCredentialAuthClientWithToken(token)
        .query<QueryDynamicLiquidityPoolsInfoResponse>({
            query: queryDocument,
            variables: {
                request
            },
        })
}

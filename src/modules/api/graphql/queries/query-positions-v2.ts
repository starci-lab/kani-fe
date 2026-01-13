import { PositionSchema } from "@/modules/types"
import { createNoCacheCredentialAuthClientWithToken } from "../clients"
import { GraphQLResponse, QueryParams } from "../types"
import { DocumentNode, gql } from "@apollo/client"

const query1 = gql`
  query PositionsV2($request: PositionsV2Request!) {
    positionsV2(request: $request) {
      message
      success
      error
      data {
        data {
            id
            openTxHash
            liquidityPool
            snapshotTargetBalanceAmountBeforeOpen
            snapshotQuoteBalanceAmountBeforeOpen
            snapshotGasBalanceAmountBeforeOpen
            snapshotTargetBalanceAmountAfterClose
            snapshotQuoteBalanceAmountAfterClose
            snapshotGasBalanceAmountAfterClose
            liquidity
            tickLower
            tickUpper
            amountA
            amountB
            minBinId
            maxBinId
            bot
            chainId
            targetIsA
            positionOpenedAt
            positionId
            isActive
            closeTxHash
            positionClosedAt
            roi
            pnl
            metadata
            feeAmountTarget
            feeAmountQuote
            positionValueAtClose
            positionValueAtOpen
            associatedLiquidityPool {
              tokenA
              tokenB
              fee
              dex
              url
            }
        }
        count
      }
    }
  }
`

export enum QueryPositionsV2 {
  Query1 = "query1",
}

const queryMap: Record<QueryPositionsV2, DocumentNode> = {
    [QueryPositionsV2.Query1]: query1,
}

export interface QueryPositionsV2Request {
    botId: string;
    filters: PositionsV2PaginationPageFilters;
}

export interface PositionsV2PaginationPageFilters {
    pageNumber?: number
    limit?: number
    asc?: boolean
}

export interface QueryPositionsV2Response {
    data: Array<PositionSchema>;
    count: number;
}
export type QueryPositionsV2Params = QueryParams<QueryPositionsV2, QueryPositionsV2Request>;

export const queryPositionsV2 = async (
    { query = QueryPositionsV2.Query1, token, request }: QueryPositionsV2Params
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
            positionsV2: GraphQLResponse<QueryPositionsV2Response> 
        }>({
            query: queryDocument,
            variables: {
                request
            },
        })
}

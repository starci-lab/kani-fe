import { PositionSchema } from "@/modules/types"
import { createNoCacheCredentialAuthClientWithToken } from "../clients"
import { GraphQLResponse, QueryParams } from "../types"
import { DocumentNode, gql } from "@apollo/client"

const query1 = gql`
  query Positions2V2($request: Positions2V2Request!) {
    positions2V2(request: $request) {
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

export enum QueryPositions2V2 {
  Query1 = "query1",
}

const queryMap: Record<QueryPositions2V2, DocumentNode> = {
    [QueryPositions2V2.Query1]: query1,
}

export interface QueryPositions2V2Request {
    botId: string;
    filters: Positions2V2PaginationPageFilters;
}

export interface Positions2V2PaginationPageFilters {
    pageNumber?: number
    limit?: number
    asc?: boolean
}

export interface QueryPositions2V2Response {
    data: Array<PositionSchema>;
    count: number;
}
export type QueryPositions2V2Params = QueryParams<QueryPositions2V2, QueryPositions2V2Request>;

export const queryPositions2V2 = async (
    { query = QueryPositions2V2.Query1, token, request }: QueryPositions2V2Params
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
            positions2V2: GraphQLResponse<QueryPositions2V2Response> 
        }>({
            query: queryDocument,
            variables: {
                request
            },
        })
}

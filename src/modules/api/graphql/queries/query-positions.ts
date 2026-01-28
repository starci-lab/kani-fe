import { PositionSchema } from "@/modules/types"
import { createApolloClient } from "../clients"
import { GraphQLResponse, QueryParams } from "../types"
import { DocumentNode, gql } from "@apollo/client"

const query1 = gql`
  query Positions($request: PositionsRequest!) {
    positions(request: $request) {
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
        }
        count
      }
    }
  }
`

export enum QueryPositions {
  Query1 = "query1",
}

const queryMap: Record<QueryPositions, DocumentNode> = {
    [QueryPositions.Query1]: query1,
}

export interface QueryPositionsRequest {
    botId: string;
    filters: PositionsPaginationPageFilters;
}

export interface PositionsPaginationPageFilters {
    pageNumber?: number
    limit?: number
}

export interface QueryPositionsResponse {
    data: Array<PositionSchema>;
    count: number;
}
export type QueryPositionsParams = QueryParams<QueryPositions, QueryPositionsRequest>;

export const queryPositions = async (
    { query = QueryPositions.Query1, token, request }: QueryPositionsParams
) => {
    if (!token) {
        throw new Error("Token is required")
    }
    if (!request) {
        throw new Error("Request is required")
    }
    const queryDocument = queryMap[query]
    // use no cache credential to include http only cookies
    return await createApolloClient({ token })
        .query<{ 
            positions: GraphQLResponse<QueryPositionsResponse> 
        }>({
            query: queryDocument,
            variables: {
                request
            },
        })
}

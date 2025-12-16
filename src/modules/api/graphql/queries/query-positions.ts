import { PositionSchema } from "@/modules/types"
import { createNoCacheCredentialAuthClientWithToken } from "../clients"
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
        }
        cursor
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
    filters: PositionsPaginationCursorFilters;
}

export interface PositionsPaginationCursorFilters {
    timestampAscending?: boolean
    cursor?: string
    limit?: number
}

export interface QueryPositionsResponse {
    data: Array<PositionSchema>;
    cursor: string;
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
    return await createNoCacheCredentialAuthClientWithToken(token)
        .query<{ 
            positions: GraphQLResponse<QueryPositionsResponse> 
        }>({
            query: queryDocument,
            variables: {
                request
            },
        })
}

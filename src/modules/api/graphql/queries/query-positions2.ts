import { PositionSchema } from "@/modules/types"
import { createNoCacheCredentialAuthClientWithToken } from "../clients"
import { GraphQLResponse, QueryParams } from "../types"
import { DocumentNode, gql } from "@apollo/client"

const query1 = gql`
  query Positions2($request: Positions2Request!) {
    positions2(request: $request) {
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

export enum QueryPositions2 {
  Query1 = "query1",
}

const queryMap: Record<QueryPositions2, DocumentNode> = {
    [QueryPositions2.Query1]: query1,
}

export interface QueryPositions2Request {
    botId: string;
    filters: Positions2PaginationPageFilters;
}

export interface Positions2PaginationPageFilters {
    pageNumber?: number
    limit?: number
}

export interface QueryPositions2Response {
    data: Array<PositionSchema>;
    count: number;
}
export type QueryPositions2Params = QueryParams<QueryPositions2, QueryPositions2Request>;

export const queryPositions2 = async (
    { query = QueryPositions2.Query1, token, request }: QueryPositions2Params
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
            positions2: GraphQLResponse<QueryPositions2Response> 
        }>({
            query: queryDocument,
            variables: {
                request
            },
        })
}

import { BotSchema } from "@/modules/types"
import { createNoCacheCredentialAuthClientWithToken } from "../clients"
import { GraphQLResponse, QueryParams } from "../types"
import { DocumentNode, gql } from "@apollo/client"

const query1 = gql`
  query Bot($request: BotRequest!) {
    bot(request: $request) {
      message
      success
      error
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
        activePosition { 
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
          createdAt
          updatedAt
        }
      }
    }
  }
`

export enum QueryBot {
  Query1 = "query1",
}

const queryMap: Record<QueryBot, DocumentNode> = {
    [QueryBot.Query1]: query1,
}

export interface QueryBotRequest {
    id: string;
}
export type QueryBotParams = QueryParams<QueryBot, QueryBotRequest>;

export const queryBot = async (
    { query = QueryBot.Query1, token, request }: QueryBotParams
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
        .query<{ bot: GraphQLResponse<BotSchema> }>({
            query: queryDocument,
            variables: {
                request
            },
        })
}

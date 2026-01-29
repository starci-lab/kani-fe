import { BotSchema } from "@/modules/types"
import { createApolloClient } from "../clients"
import { GraphQLResponse, QueryParams } from "../types"
import { DocumentNode, gql } from "@apollo/client"

const query1 = gql`
  query BotV2($request: BotV2Request!) {
    botV2(request: $request) {
      message
      success
      error
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
        version
        performanceDisplayMode
        positionsPerformanceDisplayMode
        balanceSnapshots {
          targetBalanceAmount
          quoteBalanceAmount
          gasBalanceAmount
          snapshotAt
        }
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
            openSnapshot {
              targetBalanceAmount
              quoteBalanceAmount
              gasBalanceAmount
              snapshotAt
              positionValue
              positionValueInUsd
            }
            closeSnapshot {
              targetBalanceAmount
              quoteBalanceAmount
              gasBalanceAmount
              snapshotAt
              positionValue
              positionValueInUsd
            }
            performance {
              roi
              pnl
              roiUsd
              pnlUsd
            }
            fees {
              targetAmount
              quoteAmount
            }
            positionSettlement {
              reason
              metadata
            }
            clmmState {
              tickLower
              tickUpper
            }
            dlmmState {
              minBinId
              maxBinId
            }
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
            clmmState {
              tickSpacing
              tickMultiplier
            }
            dlmmState {
              binStep
              binOffset
              basisPointMax
            }
            analytics {
              apr24H
              fees24H
              liquidity
              tvl
              volume24H
            }
          }
        }
        chartConfig {
          chartUnit
          chartInterval
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
`

export enum QueryBotV2 {
  Query1 = "query1",
}

const queryMap: Record<QueryBotV2, DocumentNode> = {
    [QueryBotV2.Query1]: query1,
}

export interface BotV2AssociateOptions {
  activePosition?: {
    liquidityPool?: boolean;
    position?: boolean;
  }
}

export interface QueryBotV2Request {
    id: string;
    associate?: BotV2AssociateOptions;
}

export type QueryBotV2Params = QueryParams<QueryBotV2, QueryBotV2Request>;

export const queryBotV2 = async (
    { query = QueryBotV2.Query1, request, token }: QueryBotV2Params
) => {
    if (!token) {
        throw new Error("Token is required")
    }
    if (!request) {
        throw new Error("Request is required")
    }
    const queryDocument = queryMap[query]
    // use no cache credential to include http only cookies
    return await createApolloClient({ token, withCredentials: true })
        .query<{ botV2: GraphQLResponse<BotSchema> }>({
            query: queryDocument,
            variables: {
                request
            },
        })
}

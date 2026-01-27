import { BotSchema } from "@/modules/types"
import { createNoCacheCredentialAuthClientWithToken } from "../clients"
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
        performanceDisplayMode
        version
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


export interface QueryBotV2Request {
    id: string;
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
    return await createNoCacheCredentialAuthClientWithToken(token)
        .query<{ botV2: GraphQLResponse<BotSchema> }>({
            query: queryDocument,
            variables: {
                request
            },
        })
}

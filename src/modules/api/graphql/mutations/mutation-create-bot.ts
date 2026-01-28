import { DocumentNode, gql } from "@apollo/client"
import { createApolloClient } from "../clients"
import { GraphQLResponse, MutationParams } from "../types"
import { ChainId, TokenId } from "@/modules/types"
import { LiquidityPoolId } from "@/modules/types"

const mutation1 = gql`
  mutation CreateBot($request: CreateBotRequest!) {
    createBot(request: $request) {
      message
      success
      data {
        id
        accountAddress
      }
    }
  }
`

export interface MutationCreateBotResponse {
    id: string;
    accountAddress: string;
}

export interface MutationCreateBotRequest {
    name: string;
    chainId: ChainId;
    targetTokenId: TokenId;
    quoteTokenId: TokenId;
    liquidityPoolIds?: Array<LiquidityPoolId>;
    isExitToUsdc: boolean;
}

export enum MutationCreateBot {
  Mutation1 = "mutation1",
}

const mutationMap: Record<MutationCreateBot, DocumentNode> = {
    [MutationCreateBot.Mutation1]: mutation1,
}

export type MutationCreateBotParams = MutationParams<MutationCreateBot, MutationCreateBotRequest>;

export const mutationCreateBot = async ({
    mutation = MutationCreateBot.Mutation1,
    request,
    token
}: MutationCreateBotParams) => {
    if (!token) {
        throw new Error("Token is required")
    }
    const mutationDocument = mutationMap[mutation]
    // use no cache credential to include http only cookies
    return await createApolloClient({ token }).mutate<{
        createBot: GraphQLResponse<MutationCreateBotResponse>,
    }>({
        mutation: mutationDocument,
        variables: {
            request
        },
    })
}

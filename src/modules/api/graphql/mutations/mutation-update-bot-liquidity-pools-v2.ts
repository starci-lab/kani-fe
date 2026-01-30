import { DocumentNode, gql } from "@apollo/client"
import { createApolloClient } from "../clients"
import { GraphQLResponse, MutationParams } from "../types"

const mutation1 = gql`
  mutation UpdateBotLiquidityPoolsV2(
    $request: UpdateBotLiquidityPoolsV2Request!
  ) {
    updateBotLiquidityPoolsV2(request: $request) {
      error
      message
      success
    }
  }
`

export interface MutationUpdateBotLiquidityPoolsV2Request {
    id: string;
    liquidityPoolIds: Array<string>;
}

export enum MutationUpdateBotLiquidityPoolsV2 {
    Mutation1 = "mutation1",
}

const mutationMap: Record<MutationUpdateBotLiquidityPoolsV2, DocumentNode> = {
    [MutationUpdateBotLiquidityPoolsV2.Mutation1]: mutation1,
}

export type MutationUpdateBotLiquidityPoolsV2Params = MutationParams<
    MutationUpdateBotLiquidityPoolsV2,
    MutationUpdateBotLiquidityPoolsV2Request
>;

export const mutationUpdateBotLiquidityPoolsV2 = async ({
    mutation = MutationUpdateBotLiquidityPoolsV2.Mutation1,
    request,
    token,
}: MutationUpdateBotLiquidityPoolsV2Params) => {
    const mutationDocument = mutationMap[mutation]
    if (!token) {
        throw new Error("Token is required")
    }
    // use no cache credential to include http only cookies
    return await createApolloClient({ token })
        .mutate<{
            updateBotLiquidityPoolsV2: GraphQLResponse;
        }>(
            {
                mutation: mutationDocument,
                variables: {
                    request,
                },
            }
        )
}

import { DocumentNode, gql } from "@apollo/client"
import { createApolloClient } from "../clients"
import { GraphQLResponse, MutationParams } from "../types"
import { PerformanceDisplayMode } from "@/modules/types"

const mutation1 = gql`
  mutation UpdateBotPositionsPerformanceDisplayModeV2($request: UpdateBotPositionsPerformanceDisplayModeV2Request!) {
    updateBotPositionsPerformanceDisplayModeV2(request: $request) {
      message
      success
      error
    }
  }
`

export interface MutationUpdateBotPositionsPerformanceDisplayModeV2Request {
    id: string;
    positionsPerformanceDisplayMode: PerformanceDisplayMode;
}

export enum MutationUpdateBotPositionsPerformanceDisplayModeV2 {
  Mutation1 = "mutation1",
}


const mutationMap: Record<MutationUpdateBotPositionsPerformanceDisplayModeV2, DocumentNode> = {
    [MutationUpdateBotPositionsPerformanceDisplayModeV2.Mutation1]: mutation1,
}

export type MutationUpdateBotPositionsPerformanceDisplayModeV2Params = MutationParams<MutationUpdateBotPositionsPerformanceDisplayModeV2, MutationUpdateBotPositionsPerformanceDisplayModeV2Request>;

export const mutationUpdateBotPositionsPerformanceDisplayModeV2 = async ({
    mutation = MutationUpdateBotPositionsPerformanceDisplayModeV2.Mutation1,
    request,
    token,
}: MutationUpdateBotPositionsPerformanceDisplayModeV2Params) => {
    const mutationDocument = mutationMap[mutation]
    if (!token) {
        throw new Error("Token is required")
    }
    // use no cache credential to include http only cookies
    return await createApolloClient({ token, withCredentials: true }).mutate<{
        updateBotPositionsPerformanceDisplayModeV2: GraphQLResponse,
    }>(
        {
            mutation: mutationDocument,
            variables: {
                request
            },
        }
    )
}

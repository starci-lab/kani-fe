import { DocumentNode, gql } from "@apollo/client"
import { createNoCacheCredentialAuthClientWithToken } from "../clients"
import { GraphQLResponse, MutationParams } from "../types"
import { PerformanceDisplayMode } from "@/modules/types"

const mutation1 = gql`
  mutation UpdateBotPerformanceDisplayModeV2($request: UpdateBotPerformanceDisplayModeV2Request!) {
    updateBotPerformanceDisplayModeV2(request: $request) {
      message
      success
      error
    }
  }
`

export interface MutationUpdateBotPerformanceDisplayModeV2Request {
    id: string;
    performanceDisplayMode: PerformanceDisplayMode;
}

export enum MutationUpdateBotPerformanceDisplayModeV2 {
  Mutation1 = "mutation1",
}


const mutationMap: Record<MutationUpdateBotPerformanceDisplayModeV2, DocumentNode> = {
    [MutationUpdateBotPerformanceDisplayModeV2.Mutation1]: mutation1,
}

export type MutationUpdateBotPerformanceDisplayModeV2Params = MutationParams<MutationUpdateBotPerformanceDisplayModeV2, MutationUpdateBotPerformanceDisplayModeV2Request>;

export const mutationUpdateBotPerformanceDisplayModeV2 = async ({
    mutation = MutationUpdateBotPerformanceDisplayModeV2.Mutation1,
    request,
    token,
}: MutationUpdateBotPerformanceDisplayModeV2Params) => {
    const mutationDocument = mutationMap[mutation]
    if (!token) {
        throw new Error("Token is required")
    }
    // use no cache credential to include http only cookies
    return await createNoCacheCredentialAuthClientWithToken(token).mutate<{
        updateBotPerformanceDisplayModeV2: GraphQLResponse,
    }>(
        {
            mutation: mutationDocument,
            variables: {
                request
            },
        }
    )
}

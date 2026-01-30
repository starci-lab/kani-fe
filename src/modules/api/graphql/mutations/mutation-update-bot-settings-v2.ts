import { DocumentNode, gql } from "@apollo/client"
import { createApolloClient } from "../clients"
import { GraphQLResponse, MutationParams } from "../types"

const mutation1 = gql`
  mutation UpdateBotSettingsV2($request: UpdateBotSettingsV2Request!) {
    updateBotSettingsV2(request: $request) {
      message
      success
      error
    }
  }
`

export interface MutationUpdateBotSettingsV2Request {
    id: string;
    name?: string;
    isExitToUsdc?: boolean;
}

export enum MutationUpdateBotSettingsV2 {
  Mutation1 = "mutation1",
}


const mutationMap: Record<MutationUpdateBotSettingsV2, DocumentNode> = {
    [MutationUpdateBotSettingsV2.Mutation1]: mutation1,
}

export type MutationUpdateBotSettingsV2Params = MutationParams<MutationUpdateBotSettingsV2, MutationUpdateBotSettingsV2Request>;

export const mutationUpdateBotSettingsV2 = async ({
    mutation = MutationUpdateBotSettingsV2.Mutation1,
    request,
    token,
}: MutationUpdateBotSettingsV2Params) => {
    const mutationDocument = mutationMap[mutation]
    if (!token) {
        throw new Error("Token is required")
    }
    // use no cache credential to include http only cookies
    return await createApolloClient({ token }).mutate<{
        updateBotSettingsV2: GraphQLResponse,
    }>(
        {
            mutation: mutationDocument,
            variables: {
                request
            },
        }
    )
}

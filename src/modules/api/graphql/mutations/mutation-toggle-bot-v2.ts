import { DocumentNode, gql } from "@apollo/client"
import { createApolloClient } from "../clients"
import { GraphQLResponse, MutationParams } from "../types"

const mutation1 = gql`
  mutation ToggleBotV2($request: ToggleBotV2Request!) {
    toggleBotV2(request: $request) {
      message
      success
      error
    }
  }
`

export interface MutationToggleBotV2Request {
    id: string;
    running: boolean;
}

export enum MutationToggleBotV2 {
  Mutation1 = "mutation1",
}


const mutationMap: Record<MutationToggleBotV2, DocumentNode> = {
    [MutationToggleBotV2.Mutation1]: mutation1,
}

export type MutationToggleBotV2Params = MutationParams<MutationToggleBotV2, MutationToggleBotV2Request>;

export const mutationToggleBotV2 = async ({
    mutation = MutationToggleBotV2.Mutation1,
    request,
    token,
}: MutationToggleBotV2Params) => {
    const mutationDocument = mutationMap[mutation]
    if (!token) {
        throw new Error("Token is required")
    }
    // use no cache credential to include http only cookies
    return await createApolloClient({ token }).mutate<{
        toggleBotV2: GraphQLResponse,
    }>(
        {
            mutation: mutationDocument,
            variables: {
                request
            },
        }
    )
}

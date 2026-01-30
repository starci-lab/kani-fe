import { DocumentNode, gql } from "@apollo/client"
import { createApolloClient } from "../clients"
import { GraphQLResponse, MutationParams } from "../types"

const mutation1 = gql`
  mutation ToggleBot($request: ToggleBotRequest!) {
    toggleBot(request: $request) {
      message
      success
      error
    }
  }
`

export interface MutationToggleBotRequest {
    id: string;
    running: boolean;
}

export enum MutationToggleBot {
  Mutation1 = "mutation1",
}


const mutationMap: Record<MutationToggleBot, DocumentNode> = {
    [MutationToggleBot.Mutation1]: mutation1,
}

export type MutationToggleBotParams = MutationParams<MutationToggleBot, MutationToggleBotRequest>;

export const mutationToggleBot = async ({
    mutation = MutationToggleBot.Mutation1,
    request,
    token,
}: MutationToggleBotParams) => {
    const mutationDocument = mutationMap[mutation]
    if (!token) {
        throw new Error("Token is required")
    }
    // use no cache credential to include http only cookies
    return await createApolloClient({ token }).mutate<{
        toggleBot: GraphQLResponse,
    }>(
        {
            mutation: mutationDocument,
            variables: {
                request
            },
        }
    )
}

import { DocumentNode, gql } from "@apollo/client"
import { createApolloClient } from "../clients"
import { GraphQLResponse, MutationParams } from "../types"

const mutation1 = gql`
  mutation EnableMFAV2($request: EnableMFAV2Request!) {
    enableMFAV2(request: $request) {
      message
      success
      error
      data {
        mfaEnabled
      }
    }
  }
`

export interface MutationEnableMFAV2Request {
    totpCode: string;
}

export interface MutationEnableMFAV2Response {
    mfaEnabled: boolean;
}

export enum MutationEnableMFAV2 {
  Mutation1 = "mutation1",
}

const mutationMap: Record<MutationEnableMFAV2, DocumentNode> = {
    [MutationEnableMFAV2.Mutation1]: mutation1,
}

export type MutationEnableMFAV2Params = MutationParams<MutationEnableMFAV2, MutationEnableMFAV2Request>;

export const mutationEnableMFAV2 = async ({
    mutation = MutationEnableMFAV2.Mutation1,
    request,
    token,
}: MutationEnableMFAV2Params) => {
    const mutationDocument = mutationMap[mutation]
    if (!token) {
        throw new Error("Token is required")
    }
    // use no cache credential to include http only cookies
    return await createApolloClient({ token }).mutate<{
        enableMFAV2: GraphQLResponse<MutationEnableMFAV2Response>,
    }>(
        {
            mutation: mutationDocument,
            variables: {
                request
            },
        }
    )
}

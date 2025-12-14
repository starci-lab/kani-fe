import { DocumentNode, gql } from "@apollo/client"
import { GraphQLResponse, GraphQLHeadersKey, MutationParams } from "../types"
import { createNoCacheCredentialAuthClientWithTokenAndHeaders } from "../clients"

const mutation1 = gql`
  mutation EnableMFA {
    enableMFA {
      message
      success
      error
      data {
        accessToken
      }
    }
  }
`

export enum MutationEnableMFA {
  Mutation1 = "mutation1",
}

export interface MutationEnableMFAResponse {
  accessToken: string;
}

const mutationMap: Record<MutationEnableMFA, DocumentNode> = {
    [MutationEnableMFA.Mutation1]: mutation1,
}

export type MutationEnableMFAParams = MutationParams<MutationEnableMFA>;

export const mutationEnableMFA = async ({
    mutation = MutationEnableMFA.Mutation1,
    token,
    headers,
}: MutationEnableMFAParams) => {
    const mutationDocument = mutationMap[mutation]
    // add to headers
    // use no cache credential to include http only cookies
    if (!headers) {
        throw new Error("Headers are required")
    }
    if (!token) {
        throw new Error("Token is required")
    }
    if (!headers[GraphQLHeadersKey.TOTP]) {
        throw new Error("TOTP is required")
    }
    return await createNoCacheCredentialAuthClientWithTokenAndHeaders(token, headers).mutate<{
    enableMFA: GraphQLResponse<MutationEnableMFAResponse>,
  }>({
      mutation: mutationDocument,
  })
}

import { DocumentNode, gql } from "@apollo/client"
import { createNoCacheCredentialAuthClientWithToken } from "../clients"
import { GraphQLResponse, MutationParams } from "../types"

const mutation1 = gql`
  mutation VerifyPrivyAuthToken {
    verifyPrivyAuthToken {
      message
      success
      error
      data {
        userId
      }
    }
  }
`

export interface MutationVerifyPrivyAuthTokenResponse {
  userId: string;
}

export enum MutationVerifyPrivyAuthToken {
  Mutation1 = "mutation1",
}

const mutationMap: Record<MutationVerifyPrivyAuthToken, DocumentNode> = {
    [MutationVerifyPrivyAuthToken.Mutation1]: mutation1,
}

export type MutationVerifyPrivyAuthTokenParams = MutationParams<
  MutationVerifyPrivyAuthToken,
  void
>;

export const mutationVerifyPrivyAuthToken = async (
    {
        mutation = MutationVerifyPrivyAuthToken.Mutation1,
        token,
    }: MutationVerifyPrivyAuthTokenParams) => {
    const mutationDocument = mutationMap[mutation]
    if (!token) {
        throw new Error("Token is required")
    }
    // use no cache credential to include http only cookies
    return await createNoCacheCredentialAuthClientWithToken(token).mutate<{
        verifyPrivyAuthToken: GraphQLResponse<MutationVerifyPrivyAuthTokenResponse>
    }>({
        mutation: mutationDocument,
    })
}

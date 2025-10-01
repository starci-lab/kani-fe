import { DocumentNode, gql } from "@apollo/client"
import { noCacheCredentialAuthClient } from "../clients"
import { GraphQLResponse, MutationParams } from "../types"

const mutation1 = gql`
  mutation ConfirmTotp($request: ConfirmTotpRequest!) {
    confirmTotp(request: $request) {
      message
      success
      error
      data {
        accessToken
      }
    }
  }
`

export interface MutationConfirmTotpRequest {
  totpCode: string;
}

export enum MutationConfirmTotp {
  Mutation1 = "mutation1",
}

export interface MutationConfirmTotpResponse {
  accessToken: string;
}

const mutationMap: Record<MutationConfirmTotp, DocumentNode> = {
    [MutationConfirmTotp.Mutation1]: mutation1,
}

export type MutationConfirmTotpParams = MutationParams<MutationConfirmTotp, MutationConfirmTotpRequest>;

export const mutationConfirmTotp = async ({
    mutation = MutationConfirmTotp.Mutation1,
    request,
}: MutationConfirmTotpParams) => {
    const mutationDocument = mutationMap[mutation]
    // use no cache credential to include http only cookies
    return await noCacheCredentialAuthClient.mutate<{
        confirmTotp: GraphQLResponse<MutationConfirmTotpResponse>,
    }>({
        mutation: mutationDocument,
        variables: {
            request
        },
    })
}

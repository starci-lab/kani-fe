import { DocumentNode, gql } from "@apollo/client"
import { createApolloClient } from "../clients"
import { GraphQLResponse, MutationParams } from "../types"

const mutation1 = gql`
  mutation DisableAuthenticatorAppV2($request: DisableAuthenticatorAppV2Request!) {
    disableAuthenticatorAppV2(request: $request) {
      message
      success
      error
    }
  }
`

export interface MutationDisableAuthenticatorAppV2Request {
    totpCode: string
}

export interface MutationDisableAuthenticatorAppV2Response {
    message: string
    success: boolean
    error?: string
}

export enum MutationDisableAuthenticatorAppV2 {
    Mutation1 = "mutation1",
}

const mutationMap: Record<MutationDisableAuthenticatorAppV2, DocumentNode> = {
    [MutationDisableAuthenticatorAppV2.Mutation1]: mutation1,
}

export type MutationDisableAuthenticatorAppV2Params = MutationParams<
    MutationDisableAuthenticatorAppV2,
    MutationDisableAuthenticatorAppV2Request
>

export const mutationDisableAuthenticatorAppV2 = async ({
    mutation = MutationDisableAuthenticatorAppV2.Mutation1,
    request,
    token,
}: MutationDisableAuthenticatorAppV2Params) => {
    const mutationDocument = mutationMap[mutation]
    if (!token) {
        throw new Error("Token is required")
    }
    return await createApolloClient({ token }).mutate<{
        disableAuthenticatorAppV2: GraphQLResponse<MutationDisableAuthenticatorAppV2Response>
    }>({
        mutation: mutationDocument,
        variables: { request },
    })
}

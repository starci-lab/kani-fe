import { DocumentNode, gql } from "@apollo/client"
import { createApolloClient } from "../clients"
import { GraphQLResponse, MutationParams } from "../types"

const mutation1 = gql`
  mutation EnableAuthenticatorAppV2($request: EnableAuthenticatorAppV2Request!) {
    enableAuthenticatorAppV2(request: $request) {
      message
      success
      error
    }
  }
`

export interface MutationEnableAuthenticatorAppV2Request {
    totpCode: string
}

export interface MutationEnableAuthenticatorAppV2Response {
    message: string
    success: boolean
    error?: string
}

export enum MutationEnableAuthenticatorAppV2 {
    Mutation1 = "mutation1",
}

const mutationMap: Record<MutationEnableAuthenticatorAppV2, DocumentNode> = {
    [MutationEnableAuthenticatorAppV2.Mutation1]: mutation1,
}

export type MutationEnableAuthenticatorAppV2Params = MutationParams<
    MutationEnableAuthenticatorAppV2,
    MutationEnableAuthenticatorAppV2Request
>

export const mutationEnableAuthenticatorAppV2 = async ({
    mutation = MutationEnableAuthenticatorAppV2.Mutation1,
    request,
    token,
}: MutationEnableAuthenticatorAppV2Params) => {
    const mutationDocument = mutationMap[mutation]
    if (!token) {
        throw new Error("Token is required")
    }
    return await createApolloClient({ token }).mutate<{
        enableAuthenticatorAppV2: GraphQLResponse<MutationEnableAuthenticatorAppV2Response>
    }>({
        mutation: mutationDocument,
        variables: { request },
    })
}

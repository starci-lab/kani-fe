import { DocumentNode, gql } from "@apollo/client"
import { createApolloClient } from "../clients"
import { MutationParams } from "../types"

const mutation1 = gql`
  mutation WithdrawV2($request: WithdrawV2Request!) {
    withdrawV2(request: $request) {
      message
      success
      error
    }
  }
`

export interface MutationWithdrawV2Token {
    id: string
    amount: string
}

export interface MutationWithdrawV2Request {
    id: string
    tokens: Array<MutationWithdrawV2Token>
}

export interface MutationWithdrawV2ResponseData {
    jobId: string
}

export interface MutationWithdrawV2Response {
    message: string
    success: boolean
    error?: string
    data?: MutationWithdrawV2ResponseData
}

export enum MutationWithdrawV2 {
    Mutation1 = "mutation1",
}

const mutationMap: Record<MutationWithdrawV2, DocumentNode> = {
    [MutationWithdrawV2.Mutation1]: mutation1,
}

export type MutationWithdrawV2Params = MutationParams<
    MutationWithdrawV2,
    MutationWithdrawV2Request
>

export const mutationWithdrawV2 = async ({
    mutation = MutationWithdrawV2.Mutation1,
    request,
    token,
    headers,
}: MutationWithdrawV2Params) => {
    const mutationDocument = mutationMap[mutation]
    if (!token) {
        throw new Error("Token is required")
    }
    return await createApolloClient({
        token,
        headers: headers ?? {},
    }).mutate<{
        withdrawV2: MutationWithdrawV2Response
    }>({
        mutation: mutationDocument,
        variables: { request },
    })
}

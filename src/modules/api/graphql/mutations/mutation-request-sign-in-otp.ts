import { DocumentNode, gql } from "@apollo/client"
import { noCacheAuthClient } from "../clients"
import { GraphQLResponse, MutationParams } from "../types"

const mutation1 = gql`
  mutation RequestSignInOtp($request: RequestSignInOtpRequest!) {
    requestSignInOtp(request: $request) {
      message
      success
      error
    }
  }
`

export interface MutationRequestSignInOtpRequest {
    email: string;
}

export enum MutationRequestSignInOtp {
  Mutation1 = "mutation1",
}


const mutationMap: Record<MutationRequestSignInOtp, DocumentNode> = {
    [MutationRequestSignInOtp.Mutation1]: mutation1,
}

export type MutationRequestSignInOtpParams = MutationParams<MutationRequestSignInOtp, MutationRequestSignInOtpRequest>;

export const mutationRequestSignInOtp = async ({
    mutation = MutationRequestSignInOtp.Mutation1,
    request,
}: MutationRequestSignInOtpParams) => {
    const mutationDocument = mutationMap[mutation]
    // use no cache credential to include http only cookies
    return await noCacheAuthClient.mutate<{
        requestSignInOtp: GraphQLResponse,
    }>({
        mutation: mutationDocument,
        variables: {
            request
        },
    })
}

import { DocumentNode, gql } from "@apollo/client"
import { createApolloClient } from "../clients"
import { GraphQLResponse, MutationParams } from "../types"

const mutation1 = gql`
  mutation VerifySignInOtp($request: VerifySignInOtpRequest!) {
    verifySignInOtp(request: $request) {
      message
      success
      error
      data {
         id  
         accessToken
      }
    }
  }
`

export interface MutationVerifySignInOtpRequest {
    email: string;
    otp: string;
}

export enum MutationVerifySignInOtp {
  Mutation1 = "mutation1",
}

export interface MutationVerifySignInOtpResponse {
    id: string;
    accessToken: string;
    refreshToken: string;
}

const mutationMap: Record<MutationVerifySignInOtp, DocumentNode> = {
    [MutationVerifySignInOtp.Mutation1]: mutation1,
}

export type MutationVerifySignInOtpParams = MutationParams<MutationVerifySignInOtp, MutationVerifySignInOtpRequest>;

export const mutationVerifySignInOtp = async ({
    mutation = MutationVerifySignInOtp.Mutation1,
    request,
}: MutationVerifySignInOtpParams) => {
    const mutationDocument = mutationMap[mutation]
    // use no cache credential to include http only cookies
    return await createApolloClient({}).mutate<{
        verifySignInOtp: GraphQLResponse<MutationVerifySignInOtpResponse>,
    }>({
        mutation: mutationDocument,
        variables: {
            request
        },
    })
}

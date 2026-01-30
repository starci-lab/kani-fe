import { DocumentNode, gql } from "@apollo/client"
import { createApolloClient } from "../clients"
import { GraphQLResponse, MutationParams } from "../types"

const mutation1 = gql`
  mutation RequestSend2FactorOtp {
    requestSend2FactorOtp {
      message
      success
      error
    }
  }
`

export enum MutationRequestSend2FactorOtp {
  Mutation1 = "mutation1",
}

const mutationMap: Record<MutationRequestSend2FactorOtp, DocumentNode> = {
    [MutationRequestSend2FactorOtp.Mutation1]: mutation1,
}

export type MutationRequestSend2FactorOtpParams = MutationParams<MutationRequestSend2FactorOtp>;

export const mutationRequestSend2FactorOtp = async ({
    mutation = MutationRequestSend2FactorOtp.Mutation1,
    token,
}: MutationRequestSend2FactorOtpParams) => {
    if (!token) {
        throw new Error("Token is required")
    }
    const mutationDocument = mutationMap[mutation]
    // use no cache credential to include http only cookies
    return await createApolloClient({ token }).mutate<{
        requestSend2FactorOtp: GraphQLResponse,
    }>({
        mutation: mutationDocument,
    })
}

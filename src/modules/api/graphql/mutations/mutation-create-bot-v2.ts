import { DocumentNode, gql } from "@apollo/client"
import { createApolloClient } from "../clients"
import { GraphQLResponse, MutationParams } from "../types"
import { ChainId } from "@/modules/types"

const mutation1 = gql`
  mutation CreateBotV2($request: CreateBotV2Request!) {
    createBotV2(request: $request) {
      message
      success
      data {
        id
        accountAddress
      }
    }
  }
`

export interface MutationCreateBotV2Response {
    id: string;
    accountAddress: string;
}

export interface MutationCreateBotV2Request {
    name: string;
    chainId: ChainId;
    targetTokenId: string;
    quoteTokenId: string;
    liquidityPoolIds?: Array<string>;
    isExitToUsdc: boolean;
    withdrawalAddress?: string;
}

export enum MutationCreateBotV2 {
  Mutation1 = "mutation1",
}

const mutationMap: Record<MutationCreateBotV2, DocumentNode> = {
    [MutationCreateBotV2.Mutation1]: mutation1,
}

export type MutationCreateBotV2Params = MutationParams<MutationCreateBotV2, MutationCreateBotV2Request>;

export const mutationCreateBotV2 = async ({
    mutation = MutationCreateBotV2.Mutation1,
    request,
    token
}: MutationCreateBotV2Params) => {
    if (!token) {
        throw new Error("Token is required")
    }
    const mutationDocument = mutationMap[mutation]
    // use no cache credential to include http only cookies
    return await createApolloClient({ token }).mutate<{
        createBotV2: GraphQLResponse<MutationCreateBotV2Response>,
    }>({
        mutation: mutationDocument,
        variables: {
            request
        },
    })
}

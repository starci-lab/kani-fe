import { DocumentNode, gql } from "@apollo/client"
import { createApolloClient } from "../clients"
import {
    GraphQLResponse,
    MutationParams,
} from "../types"
import {
    ChartInterval,
    ChartUnit,
} from "@/modules/types"

const mutation1 = gql`
  mutation UpdateBotChartConfigV2($request: UpdateBotChartConfigV2Request!) {
    updateBotChartConfigV2(request: $request) {
      message
      success
      error
    }
  }
`

export interface MutationUpdateBotChartConfigV2Request {
    id: string;
    chartUnit?: ChartUnit;
    chartInterval?: ChartInterval;
}

export enum MutationUpdateBotChartConfigV2 {
    Mutation1 = "mutation1",
}

const mutationMap: Record<MutationUpdateBotChartConfigV2, DocumentNode> = {
    [MutationUpdateBotChartConfigV2.Mutation1]: mutation1,
}

export type MutationUpdateBotChartConfigV2Params = MutationParams<
    MutationUpdateBotChartConfigV2,
    MutationUpdateBotChartConfigV2Request
>;

export const mutationUpdateBotChartConfigV2 = async ({
    mutation = MutationUpdateBotChartConfigV2.Mutation1,
    request,
    token,
}: MutationUpdateBotChartConfigV2Params) => {
    const mutationDocument = mutationMap[mutation]
    if (!token) {
        throw new Error("Token is required")
    }
    // use no cache credential to include http only cookies
    return await createApolloClient({ token, withCredentials: true }).mutate<{
        updateBotChartConfigV2: GraphQLResponse,
    }>({
        mutation: mutationDocument,
        variables: {
            request,
        },
    })
}

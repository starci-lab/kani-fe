import { createApolloClient } from "../clients"
import { GraphQLResponse, QueryParams } from "../types"
import { DocumentNode, gql } from "@apollo/client"

const query1 = gql`
    query Fees($request: FeesRequest!) {
        fees(request: $request) {
            data {
              tokenA
              tokenB
            }
            error
            message
            success
        }
    }`

export interface FeesResponse {
  tokenA: string;
  tokenB: string;
}

export enum QueryFees {
  Query1 = "query1",
}

export interface FeesRequest {
  botId: string;
  activePositionId: string;
}

const queryMap: Record<QueryFees, DocumentNode> = {
    [QueryFees.Query1]: query1,
}

export type QueryFeesParams = QueryParams<
  QueryFees,
  FeesRequest
>;

export const queryFees = async (
    { query = QueryFees.Query1, request, token }: QueryFeesParams,
) => {
    const queryDocument = queryMap[query]
    if (!token) {
        throw new Error("Token is required")
    }
    return await createApolloClient({ token }).query<{
        fees: GraphQLResponse<FeesResponse>;
  }>({
      query: queryDocument,
      variables: {
          request,
      },
  })
}

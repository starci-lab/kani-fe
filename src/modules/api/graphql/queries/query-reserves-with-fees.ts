import { createApolloClient } from "../clients"
import { GraphQLResponse, QueryParams } from "../types"
import { DocumentNode, gql } from "@apollo/client"

const query1 = gql`
    query ReservesWithFees($request: ReservesWithFeesRequest!) {
        reservesWithFees(request: $request) {
            data {
              reserveA
              reserveB
              feeA
              feeB
              rewards
            }
            error
            message
            success
        }
    }`

export interface ReservesWithFeesResponse {
  reserveA: number;
  reserveB: number;
  feeA: number;
  feeB: number;
  rewards: Record<string, number>;
}

export enum QueryReservesWithFees {
  Query1 = "query1",
}

export interface ReservesWithFeesRequest {
  botId: string;
  activePositionId: string;
}

const queryMap: Record<QueryReservesWithFees, DocumentNode> = {
    [QueryReservesWithFees.Query1]: query1,
}

export type QueryReservesWithFeesParams = QueryParams<
  QueryReservesWithFees,
  ReservesWithFeesRequest
>;

export const queryReservesWithFees = async (
    { query = QueryReservesWithFees.Query1, request, token }: QueryReservesWithFeesParams,
) => {
    const queryDocument = queryMap[query]
    if (!token) {
        throw new Error("Token is required")
    }
    return await createApolloClient({ token }).query<{
        reservesWithFees: GraphQLResponse<ReservesWithFeesResponse>;
  }>({
      query: queryDocument,
      variables: {
          request,
      },
  })
}

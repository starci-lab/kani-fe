import { createApolloClient } from "../clients"
import { GraphQLResponse, QueryParams } from "../types"
import { DocumentNode, gql } from "@apollo/client"

const query1 = gql`
    query Reserves($request: ReservesRequest!) {
        reserves(request: $request) {
            data {
              tokenA
              tokenB
            }
        }
    }`

export interface ReservesResponse {
  tokenA: string;
  tokenB: string;
}

export enum QueryReserves {
  Query1 = "query1",
}

export interface ReservesRequest {
  botId: string;
  activePositionId: string;
}

const queryMap: Record<QueryReserves, DocumentNode> = {
    [QueryReserves.Query1]: query1,
}

export type QueryReservesParams = QueryParams<
  QueryReserves,
  ReservesRequest
>;

export const queryReserves = async (
    { query = QueryReserves.Query1, request, token }: QueryReservesParams,
) => {
    const queryDocument = queryMap[query]
    if (!token) {
        throw new Error("Token is required")
    }
    return await createApolloClient({ token }).query<{
        reserves: GraphQLResponse<ReservesResponse>;
  }>({
      query: queryDocument,
      variables: {
          request,
      },
  })
}

import { createApolloClient } from "../clients"
import { GraphQLResponse, QueryParams } from "../types"
import { DocumentNode, gql } from "@apollo/client"

const query1 = gql`
    query ReservesV2($request: ReservesV2Request!) {
        reservesV2(request: $request) {
            data {
              tokenA
              tokenB
            }
        }
    }`

export interface ReservesV2Response {
  tokenA: string;
  tokenB: string;
}

export enum QueryReservesV2 {
  Query1 = "query1",
}

export interface ReservesV2Request {
  botId: string;
  activePositionId: string;
}

const queryMap: Record<QueryReservesV2, DocumentNode> = {
    [QueryReservesV2.Query1]: query1,
}

export type QueryReservesV2Params = QueryParams<
  QueryReservesV2,
  ReservesV2Request
>;

export const queryReservesV2 = async (
    { query = QueryReservesV2.Query1, request, token }: QueryReservesV2Params,
) => {
    const queryDocument = queryMap[query]
    if (!token) {
        throw new Error("Token is required")
    }
    return await createApolloClient({ token }).query<{
        reservesV2: GraphQLResponse<ReservesV2Response>;
  }>({
      query: queryDocument,
      variables: {
          request,
      },
  })
}

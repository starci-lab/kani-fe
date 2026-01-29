import { createApolloClient } from "../clients"
import { GraphQLResponse, QueryParams } from "../types"
import { DocumentNode, gql } from "@apollo/client"

const query1 = gql`
    query ReservesWithFeesV2($request: ReservesWithFeesV2Request!) {
        reservesWithFeesV2(request: $request) {
            data {
              feeA
              feeB
              rewards
              reserveA
              reserveB
            }
            error
            message
            success
        }
    }`

export interface ReservesWithFeesV2Response {
  feeA: number;
  feeB: number;
  reserveA: number;
  reserveB: number;
  rewards: Record<string, number>;
}

export enum QueryReservesWithFeesV2 {
  Query1 = "query1",
}

export interface ReservesWithFeesV2Request {
  botId: string;
}

const queryMap: Record<QueryReservesWithFeesV2, DocumentNode> = {
    [QueryReservesWithFeesV2.Query1]: query1,
}

export type QueryReservesWithFeesV2Params = QueryParams<
  QueryReservesWithFeesV2,
  ReservesWithFeesV2Request
>;

export const queryReservesWithFeesV2 = async (
    { query = QueryReservesWithFeesV2.Query1, request, token }: QueryReservesWithFeesV2Params,
) => {
    const queryDocument = queryMap[query]
    if (!token) {
        throw new Error("Token is required")
    }
    return await createApolloClient({ token }).query<{
        reservesWithFeesV2: GraphQLResponse<ReservesWithFeesV2Response>;
  }>({
      query: queryDocument,
      variables: {
          request,
      },
  })
}

import { createApolloClient } from "../clients"
import {
    GraphQLResponse,
    ChartUnit,
    QueryParams,
    ChartInterval,
} from "../types"
import { DocumentNode, gql } from "@apollo/client"

const query1 = gql`
  query HistoryV2($request: HistoryV2Request!) {
    historyV2(request: $request) {
      data {
        count
        series {
          timestamp
          value
        }
      }
    }
  }
`

export enum QueryHistoryV2 {
  Query1 = "query1",
}

const queryMap: Record<QueryHistoryV2, DocumentNode> = {
    [QueryHistoryV2.Query1]: query1,
}

export interface QueryHistoryV2Request {
  botId: string;
  filters: Partial<{
    from: string;
    interval: ChartInterval;
    to: string;
    unit: ChartUnit;
    timeZone: string;
  }>;
}

export type QueryHistoryV2Params = QueryParams<QueryHistoryV2, QueryHistoryV2Request>;

export interface QueryHistoryV2Response {
  count: number;
  series: Array<{
    timestamp: string;
    value: number;
  }>;
}

export const queryHistoryV2 = async ({
    query = QueryHistoryV2.Query1,
    token,
    request,
}: QueryHistoryV2Params) => {
    if (!token) {
        throw new Error("Token is required")
    }
    if (!request) {
        throw new Error("Request is required")
    }
    const queryDocument = queryMap[query]
    // use no cache credential to include http only cookies
    return await createApolloClient({ token }).query<{
    historyV2: GraphQLResponse<QueryHistoryV2Response>;
  }>({
      query: queryDocument,
      variables: {
          request,
      },
  })
}

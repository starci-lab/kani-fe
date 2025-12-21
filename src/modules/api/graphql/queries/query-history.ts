import { createNoCacheCredentialAuthClientWithToken } from "../clients"
import {
    GraphQLResponse,
    ChartUnit,
    QueryParams,
    ChartInterval,
} from "../types"
import { DocumentNode, gql } from "@apollo/client"

const query1 = gql`
  query History($request: HistoryRequest!) {
    history(request: $request) {
      data {
        count
        series {
          timestamp
          value {
            gasValue
            quoteValue
            targetValue
          }
        }
      }
    }
  }
`

export enum QueryHistory {
  Query1 = "query1",
}

const queryMap: Record<QueryHistory, DocumentNode> = {
    [QueryHistory.Query1]: query1,
}

export interface QueryHistoryRequest {
  botId: string;
  filters: Partial<{
    from: string;
    interval: ChartInterval;
    to: string;
    unit: ChartUnit;
    timeZone: string;
  }>;
}

export type QueryHistoryParams = QueryParams<QueryHistory, QueryHistoryRequest>;

export interface QueryHistoryResponse {
  count: number;
  series: Array<{
    timestamp: string;
    value: {
      gasValue: number;
      quoteValue: number;
      targetValue: number;
    };
  }>;
}

export const queryHistory = async ({
    query = QueryHistory.Query1,
    token,
    request,
}: QueryHistoryParams) => {
    if (!token) {
        throw new Error("Token is required")
    }
    if (!request) {
        throw new Error("Request is required")
    }
    const queryDocument = queryMap[query]
    // use no cache credential to include http only cookies
    return await createNoCacheCredentialAuthClientWithToken(token).query<{
    history: GraphQLResponse<QueryHistoryResponse>;
  }>({
      query: queryDocument,
      variables: {
          request,
      },
  })
}

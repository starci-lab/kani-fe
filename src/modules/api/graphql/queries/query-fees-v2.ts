import { createNoCacheCredentialAuthClientWithToken } from "../clients"
import { GraphQLResponse, QueryParams } from "../types"
import { DocumentNode, gql } from "@apollo/client"

const query1 = gql`
    query FeesV2($request: FeesV2Request!) {
        feesV2(request: $request) {
            data {
              tokenA
              tokenB
            }
            error
            message
            success
        }
    }`

export interface FeesV2Response {
  tokenA: string;
  tokenB: string;
}

export enum QueryFeesV2 {
  Query1 = "query1",
}

export interface FeesV2Request {
  botId: string;
  activePositionId: string;
}

const queryMap: Record<QueryFeesV2, DocumentNode> = {
    [QueryFeesV2.Query1]: query1,
}

export type QueryFeesV2Params = QueryParams<
  QueryFeesV2,
  FeesV2Request
>;

export const queryFeesV2 = async (
    { query = QueryFeesV2.Query1, request, token }: QueryFeesV2Params,
) => {
    const queryDocument = queryMap[query]
    if (!token) {
        throw new Error("Token is required")
    }
    return await createNoCacheCredentialAuthClientWithToken(token).query<{
        feesV2: GraphQLResponse<FeesV2Response>;
  }>({
      query: queryDocument,
      variables: {
          request,
      },
  })
}

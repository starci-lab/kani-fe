import { createApolloClient } from "../clients"
import { GraphQLResponse, QueryParams } from "../types"
import { DocumentNode, gql } from "@apollo/client"
import { BalanceEvalStatus } from "@/modules/types"

const query1 = gql`
    query PortfolioValueV2($request: PortfolioValueV2Request!) {
        portfolioValueV2(request: $request) {
            data {
                targetBalanceAmount
                quoteBalanceAmount
                gasBalanceAmount
                status
            portfolioValue {
                excludingGas
                includingGas
            }
            portfolioValueInUsd {
                excludingGas
                includingGas
            }
            }
            error
            message
            success
        }
    }`

export interface PortfolioValueV2Snapshot {
    excludingGas: string;
    includingGas: string;
}

export interface PortfolioValueV2Response {
    targetBalanceAmount: string;
    quoteBalanceAmount: string;
    gasBalanceAmount: string;
    status: BalanceEvalStatus;
    portfolioValue: PortfolioValueV2Snapshot;
    portfolioValueInUsd: PortfolioValueV2Snapshot;
}

export enum QueryPortfolioValueV2 {
    Query1 = "query1",
}

export interface PortfolioValueV2Request {
    botId: string;
}

const queryMap: Record<QueryPortfolioValueV2, DocumentNode> = {
    [QueryPortfolioValueV2.Query1]: query1,
}

export type QueryPortfolioValueV2Params = QueryParams<
    QueryPortfolioValueV2,
    PortfolioValueV2Request
>;

export const queryPortfolioValueV2 = async (
    { query = QueryPortfolioValueV2.Query1, request, token }: QueryPortfolioValueV2Params,
) => {
    const queryDocument = queryMap[query]
    if (!token) {
        throw new Error("Token is required")
    }
    return await createApolloClient({ token, withCredentials: true }).query<{
        portfolioValueV2: GraphQLResponse<PortfolioValueV2Response>;
    }>({
        query: queryDocument,
        variables: {
            request,
        },
    })
}

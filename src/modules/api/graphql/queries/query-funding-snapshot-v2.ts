import { createNoCacheCredentialAuthClientWithToken } from "../clients"
import { GraphQLResponse, QueryParams } from "../types"
import { DocumentNode, gql } from "@apollo/client"
import { BalanceEligibilityStatus } from "@/modules/types"

const query1 = gql`
    query FundingSnapshotV2($request: FundingSnapshotV2Request!) {
        fundingSnapshotV2(request: $request) {
            data {
                balanceEligibilityStatus
                gasBalanceAmount
                quoteBalanceAmount
                targetBalanceAmount
                balanceExcludingGasInUsdc
                balanceIncludingGasInUsdc
            }
            error
            message
            success
        }
    }`

export interface FundingSnapshotV2Response {
    balanceEligibilityStatus: BalanceEligibilityStatus;
    gasBalanceAmount: string;
    quoteBalanceAmount: string;
    targetBalanceAmount: string;
    balanceExcludingGasInUsdc: string;
    balanceIncludingGasInUsdc: string;
}

export enum QueryFundingSnapshotV2 {
    Query1 = "query1",
}

export interface FundingSnapshotV2Request {
    botId: string;
}

const queryMap: Record<QueryFundingSnapshotV2, DocumentNode> = {
    [QueryFundingSnapshotV2.Query1]: query1,
}

export type QueryFundingSnapshotV2Params = QueryParams<
    QueryFundingSnapshotV2,
    FundingSnapshotV2Request
>;

export const queryFundingSnapshotV2 = async (
    { query = QueryFundingSnapshotV2.Query1, request, token }: QueryFundingSnapshotV2Params,
) => {
    const queryDocument = queryMap[query]
    if (!token) {
        throw new Error("Token is required")
    }
    return await createNoCacheCredentialAuthClientWithToken(token).query<{
        fundingSnapshotV2: GraphQLResponse<FundingSnapshotV2Response>;
    }>({
        query: queryDocument,
        variables: {
            request,
        },
    })
}

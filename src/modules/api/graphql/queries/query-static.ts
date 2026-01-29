import { DocumentNode, gql } from "@apollo/client"
import { GraphQLResponse, QueryParams } from "../types"
import { 
    TokenSchema, 
    DexSchema, 
    AccountLimitsConfig, 
    GasConfig, 
    BalanceConfig 
} from "@/modules/types"
import { client } from "../clients"

const query1 = gql`
  query Static {
    tokens {
        success
        message
        error
        data {
            chainId
            createdAt
            decimals
            displayId
            iconUrl
            id
            symbol
            is2022Token
            marketListings {
                priority
                symbol
            }
            name
            projectUrl
            selectable
        }
    }
    dexes {
        success
        message
        error
        data {
            id
            createdAt
            updatedAt
            displayId
            name
            description
            website
            iconUrl
            chainIds
        }
    } 
    accountLimits {
        success
        message
        error
        data
    }
    gasConfig {
        success
        message
        error
        data
    }
    balanceConfig {
        success
        message
        error
        data
    }
}`

export enum QueryStatic {
    Query1 = "query1",
  }
  
const queryMap: Record<QueryStatic, DocumentNode> = {
    [QueryStatic.Query1]: query1,
}
  
export interface QueryStaticResponse {
    tokens: GraphQLResponse<Array<TokenSchema>>
    dexes: GraphQLResponse<Array<DexSchema>>
    gasConfig: GraphQLResponse<GasConfig>
    accountLimits: GraphQLResponse<AccountLimitsConfig>
    balanceConfig: GraphQLResponse<BalanceConfig>
}

export type QueryStaticParams = QueryParams<QueryStatic, QueryStaticResponse>;
  
export const queryStatic = async (
    { query = QueryStatic.Query1 }: QueryStaticParams,
) => {
    const queryDocument = queryMap[query]
    // use original cache client to avoid query cache
    return await client.query<QueryStaticResponse>({
        query: queryDocument,
    })
}
  
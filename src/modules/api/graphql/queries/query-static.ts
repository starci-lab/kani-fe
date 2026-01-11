import { DocumentNode, gql } from "@apollo/client"
import { GraphQLResponse, QueryParams } from "../types"
import { 
    LiquidityPoolSchema, 
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
            id
            createdAt
            updatedAt
            displayId
            name
            symbol
            decimals
            tokenAddress
            coinMarketCapId
            coinGeckoId
            iconUrl
            chainId
            projectUrl
            cexIds
            whichCex
            cexSymbols
            type
            pythFeedId
        }
    }
    liquidityPools {
        success
        message
        error
        data {
            id
            createdAt
            updatedAt
            displayId
            poolAddress
            type
            fee
            chainId
            dex
            tokenA
            tokenB
            url
            binStep
            basisPointMax
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
    liquidityPools: GraphQLResponse<Array<LiquidityPoolSchema>>
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
  
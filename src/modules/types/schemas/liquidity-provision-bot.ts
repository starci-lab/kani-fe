import { ChainId } from "@/modules/types"
import { AbstractSchema } from "./abstract"
import { ExplorerId } from "@/modules/blockchain"

export interface LiquidityProvisionBotSchema  extends AbstractSchema  {
    /** The account address of the wallet used by this bot. */
    accountAddress?: string
    /** The encrypted private key associated with the wallet. */
    encryptedPrivateKey?: string
    /** Blockchain network where the bot operates (e.g., SUI, SOLANA). */
    chainId: ChainId
    /** The user who owns or provisions this bot. */
    user: string
    /** Human-readable bot name for identification. */
    name: string
    /** Token that the bot prioritizes when managing liquidity. */
    priorityToken?: string
    /** List of liquidity pools that the bot manages. */
    liquidityPools: Array<string>
    /** Whether the bot has been initialized successfully. */
    initialized: boolean
    /** The preferred explorer.*/
    explorerId?: ExplorerId
    /** The RPC URLs to use for the bot. */
    rpcUrls?: Array<string>
    /** Whether the bot is currently running (active automation loop). */
    running: boolean
    /** Timestamp indicating when the bot was last started. */
    lastRunAt?: Date
    /** Timestamp indicating when the bot was last stopped. */
    stoppedAt?:  Date
}
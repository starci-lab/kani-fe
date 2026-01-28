import BN from "bn.js"
import { FetchSuiBalanceProps } from "./types"
import { toDecimalAmount } from "@/modules/utils"

export const fetchSuiBalance = async ({
    tokenAddress, client, owner, decimals }: FetchSuiBalanceProps) => {
    const balance = await client.getBalance({
        owner,
        coinType: tokenAddress,
    })
    const balanceRaw = new BN(balance.totalBalance)
    return {
        balanceRaw,
        balance: toDecimalAmount({ amount: balanceRaw, decimals }),
    }
}
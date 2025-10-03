import { SuiClient } from "@mysten/sui/client"

export const createSuiClient = (
    url: string
) => new SuiClient({
    url,
})
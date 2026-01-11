export enum OauthProviderName {
    Google = "google",
    Facebook = "facebook",
    X = "x",
}

export enum LiquidityPoolType {
    Clmm = "clmm",
    Dlmm = "dlmm",
}

export enum TransactionType {
    OpenPosition = "openPosition",
    ClosePosition = "closePosition",
    Swap = "swap",
}

export enum BalanceEligibilityStatus {
    Ok = "ok",
    StalePrice = "stalePrice",
    NotEnoughGas = "notEnoughGas",
    InsufficientFunds = "insufficientFunds",
    Error = "error",
}
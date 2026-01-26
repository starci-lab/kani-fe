export enum TokenId {
    // --- Sui ---
    SuiUsdc = "suiUsdc",
    SuiIka = "suiIka",
    SuiNative = "suiNative",
    SuiWalrus = "suiWalrus",
    SuiCetus = "suiCetus",
    SuiAlkimi = "suiAlkimi",
    SuiDeep = "suiDeep",
    SuiEth = "suiEth",
    SuiXStakedSui = "suiXStakedSui",

    // --- Solana ---
    SolUsdc = "solUsdc",
    SolNative = "solNative",
    SolMsol = "solMsol",
    SolRay = "solRay",
    SolOrca = "solOrca",
    SolUsdt = "solUsdt",
}

export enum DexId {
    Cetus = "cetus",
    Turbos = "turbos",
    Momentum = "momentum",
    FlowX = "flowx",
    Raydium = "raydium",
    Orca = "orca",
    Meteora = "meteora",
    Saros = "saros",
}

export enum LiquidityPoolId {
    CetusSuiIka02 = "cetusSuiIka02",
    CetusUsdcSui005 = "cetusUsdcSui005",  
    CetusUsdcEth025 = "cetusUsdcEth025",
    TurbosIkaUsdc015 = "turbosIkaUsdc015",
    TurbosDeepUsdc015 = "turbosDeepUsdc015",
    TurbosSuiUsdc005 = "turbosSuiUsdc005",
    MomentumWalSui02 = "momentumWalSui02",
    MomentumSuiUsdc0175 = "momentumSuiUsdc0175",
    FlowXSuiUsdc03 = "flowXSuiUsdc03",
    RaydiumSolUsdc004 = "raydiumSolUsdc004",
    RaydiumSolUsdt001 = "raydiumSolUsdt001",
    OrcaSolUsdc004 = "orcaSolUsdc004",
    MeteoraSolUsdcBinStep4 = "meteoraSolUsdcBinStep4"
}

export enum CexId {
    Binance = "binance",
    Gate = "gate",
    Bybit = "bybit"
}

export enum ConfigId {
    Gas = "gas",
    Balance = "balance",
    AccountLimits = "accountLimits",
}

export enum StateId {
    RpcEjection = "rpcEjection",
}

export enum ExplorerId {
    // SUI
    SuiVision = "suiVision",
    SuiScan = "suiScan",
    // SOLANA
    Solscan = "solscan",
    SolanaFM = "solanaFm",
    SolanaExplorer = "solanaExplorer",
}

export enum MarketListingId {
    Binance = "binance",
    Gate = "gate",
    Bybit = "bybit",
    Pyth = "pyth",
    Coingecko = "coingecko",
    CoinMarketCap = "coinmarketcap",
}

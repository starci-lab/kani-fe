export enum LiquidityPoolType {
    Clmm = "clmm",
    Dlmm = "dlmm",
}

export enum QuoteRatioStatus {
    Good = "good",
    TargetUnderweighted = "targetUnderweighted",
    TargetOverweighted  = "targetOverweighted",
}

export enum BotType {
    Standard = "standard",
    Privy = "privy",
}

export enum TransactionType {
    Swap = "swap",
    OpenPosition = "openPosition",
    ClosePosition = "closePosition",
}

export enum JobType {
    OpenPosition = "openPosition",
    ClosePosition = "closePosition",
    ReconcileBalance = "reconcileBalance",
}

export enum JobStatus {
    Pending = "pending",
    Prepared = "prepared",
    Executed = "executed",
    Confirmed = "confirmed",
    Completed = "completed",
    Failed = "failed",
}

export enum AppVersion {
    V1 = "v1",
    V2 = "v2",
}

export enum PositionSettlementReason {
    OutOfRange = "outOfRange",
}

export enum PerformanceDisplayMode {
    Target = "target",
    Usd = "usd",
}

export enum BalanceEvalStatus {
    Ok = "ok",
    InPosition = "inPosition",
    InsufficientFunding = "insufficientFunding",
    InsufficientGas = "insufficientGas",
    TargetUnderweighted = "targetUnderweighted",
    TargetOverweighted  = "targetOverweighted",
}

export enum ChartInterval {
    FifteenMinutes = "fifteenMinutes",
    ThirtyMinutes = "thirtyMinutes",
    OneHour = "oneHour",
    TwoHours = "twoHours",
    FourHours = "fourHours",
    Day = "day",
}

export enum ChartUnit {
    Usd = "usd",
    Target = "target",
}

export enum BotStatus {
    InRange = "inRange",
    OutOfRange = "outOfRange",
    Idle = "idle",
}
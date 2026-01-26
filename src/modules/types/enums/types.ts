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

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
    ReconcileBalance = "reconcileBalance",
    Withdraw = "withdraw",
    OpenPosition = "openPosition",
    ClosePosition = "closePosition",
}

export enum JobType {
    OpenPosition = "openPosition",
    ClosePosition = "closePosition",
    ReconcileBalance = "reconcileBalance",
    Withdraw = "withdraw",
    TransferFees = "transferFees",
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
    ViolateIndicatorsTriggered = "violateIndicatorsTriggered",
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

export enum AuthenticationFactor {
    TOTP = "totp",
}

/**
 * The tier of the range
 */
export enum RangeTier {
    Narrow = "narrowRange",
    Mid = "midRange",
    Wide = "wideRange"
}

/**
 * Logical operator to combine conditions (And = all, Or = at least one).
 */
export enum LogicalOperator {
    And = "and",
    Or = "or",
}

/**
 * Type of bot violate indicator.
 */
export enum BotViolateIndicatorType {
    PricePct = "pricePct",
    PriceRegression = "priceRegression",
    VolumeSpike = "volumeSpike",
}

/**
 * Field name used in violate indicator conditions (op + value).
 */
export enum IndicatorName {
    Pct = "pct",
    R2 = "r2",
}

export enum TaskType {
    OpenPosition = "openPosition",
    ClosePosition = "closePosition",
    ReconcileBalance = "reconcileBalance",
    TransferFees = "transferFees",
    Withdraw = "withdraw",
    ExitUsdc = "exitUsdc",
}

export enum StepType {
    Sign = "sign",
    Execute = "execute",
}
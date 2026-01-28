import React, { useMemo } from "react"
import { useQueryPortfolioValueV2Swr } from "@/hooks/singleton"
import { BalanceEligibilityStatus, ChainId, TokenType } from "@/modules/types"
import { KaniAlert } from "@/components/atomic"
import { Spacer } from "@heroui/react"
import { useAppSelector } from "@/redux"
import { computeDenomination } from "@/modules/utils"
import { BN } from "bn.js"

export const EligibilityStatus = () => {
    const queryPortfolioValueV2Swr = useQueryPortfolioValueV2Swr()
    const balanceEligibilityStatus = queryPortfolioValueV2Swr.data?.data?.portfolioValueV2?.data?.status

    // const renderEligibilityStatus = () => {
    //     switch (balanceEligibilityStatus) {
    //         case BalanceEligibilityStatus.Ok:
    //             return <></>
    //         case BalanceEligibilityStatus.NotEnoughGas:
    //             return (<>
    //                 <Spacer y={4} />
    //                 <KaniAlert
    //                     color="warning"
    //                     title="Not Enough Gas"
    //                     description={
    //                         <div>
    //                             <div>The bot does not have enough gas to open a position.</div>
    //                             <div>
    //                                 Required gas: {targetOperationalAmountDecimal.toString()} {targetToken?.symbol}.
    //                                 Current gas: {queryFundingSnapshotV2Swr.data?.data?.fundingSnapshotV2?.data?.gasBalanceAmount?.toString() || "0"} {gasToken?.symbol}.
    //                             </div>
    //                         </div>
    //                     }
    //                 />
    //             </>
    //             )
    //         case BalanceEligibilityStatus.InsufficientFunds:
    //             return (<>
    //                 <Spacer y={4} />
    //                 <KaniAlert
    //                     color="warning"
    //                     title="Insufficient Funds"
    //                     description={
    //                         <div>
    //                             <div>The bot does not have enough funds to open a position.</div>
    //                             <div>
    //                                 Required balance (excluding gas): {minRequiredAmountInUsd} USD.
    //                                 Current balance:{" "}
    //                                 {queryFundingSnapshotV2Swr.data?.data?.fundingSnapshotV2?.data?.balanceExcludingGasInUsdc?.toString() || "0"} USD.
    //                             </div>
    //                         </div>
    //                     }
    //                 />
    //             </>
    //             )
    //         case BalanceEligibilityStatus.StalePrice:
    //         case BalanceEligibilityStatus.Error:
    //             return (<>
    //                 <Spacer y={4} />
    //                 <KaniAlert
    //                     color="danger"
    //                     title="Error"
    //                     description="An error occurred while fetching the eligibility status."
    //                 />
    //             </>
    //             )
    //     }
    // }
    // return renderEligibilityStatus()
    return <></>
}
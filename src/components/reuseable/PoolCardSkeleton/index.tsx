import { KaniCard, KaniCardBody, KaniDivider, KaniSkeleton } from "../../atomic"
import { Spacer } from "@heroui/react"
import { TooltipTitle } from "../TooltipTitle"
import React from "react"

export const PoolCardSkeleton = () => {
    return (
        <KaniCard>
            <KaniCardBody>
                <div className="flex items-center justify-between gap-4">
                    <KaniSkeleton className="h-[28px] w-[120px] rounded-md" />
                    <KaniSkeleton className="h-[28px] w-[120px] rounded-md" />
                </div>
                <Spacer y={3} />
                <KaniDivider />
                <Spacer y={3} />
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-4">
                        <TooltipTitle title="TVL 24H" classNames={{ title: "text-sm text-foreground-500" }} />
                        <KaniSkeleton className="h-5 w-[50px] rounded-md" />
                    </div>
                    <div className="flex items-center justify-between gap-4">
                        <TooltipTitle title="Fees 24H" classNames={{ title: "text-sm text-foreground-500" }} />
                        <KaniSkeleton className="h-5 w-[50px] rounded-md" />
                    </div>
                    <div className="flex items-center justify-between gap-4">
                        <TooltipTitle title="Volume 24H" classNames={{ title: "text-sm text-foreground-500" }} />
                        <KaniSkeleton className="h-5 w-[50px] rounded-md" />
                    </div>
                    <div className="flex items-center justify-between gap-4">
                        <TooltipTitle title="APR 24H" classNames={{ title: "text-sm text-foreground-500" }} />
                        <KaniSkeleton className="h-5 w-[50px] rounded-md" />
                    </div>
                </div>
                <Spacer y={3} />
                <KaniDivider />
                <Spacer y={3} />
                <KaniSkeleton className="h-5 w-[150px] rounded-md" />
            </KaniCardBody>
        </KaniCard>
    )
}
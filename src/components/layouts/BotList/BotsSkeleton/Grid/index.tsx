import React from "react"
import { KaniCard, KaniCardBody, KaniDivider, KaniSkeleton } from "../../../../atomic"
import { Spacer } from "@heroui/react"
import { TooltipTitle } from "../../../../reuseable"

export const Grid = () => {
    return (
        <KaniCard>
            <KaniCardBody>
                <div className="flex items-center justify-between gap-4">
                    <KaniSkeleton className="w-[100px] h-6 rounded-md"/>
                    <KaniSkeleton className="w-[50px] h-6 rounded-full"/>
                </div>
                <Spacer y={6} />
                <div className="flex items-center gap-4 justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex justify-between items-center gap-2">
                            <TooltipTitle
                                classNames={{
                                    title: "text-sm text-foreground-500",
                                }}
                                title="ROI"
                                tooltipString="The return on investment, showing how much profit or loss the bot made compared to the initial position value."
                            />
                            <KaniSkeleton className="w-[50px] h-5 rounded-md"/>
                        </div>
                        <div className="flex justify-between items-center gap-2">
                            <TooltipTitle
                                classNames={{
                                    title: "text-sm text-foreground-500",
                                }}
                                title="PNL"
                                tooltipString="The return on investment, showing how much profit or loss the bot made compared to the initial position value."
                            />
                            <KaniSkeleton className="w-[50px] h-5 rounded-md"/>
                        </div>
                    </div>
                    <KaniSkeleton className="w-[50px] h-5 rounded-md"/>
                </div>
                <Spacer y={6} />
                <div className="flex items-center gap-4 justify-between">
                    <TooltipTitle
                        classNames={{
                            title: "text-sm text-foreground-500",
                        }}
                        title="Funding"
                        tooltipString="The amount of funding the bot."
                    />
                    <KaniSkeleton className="w-[50px] h-5 rounded-md"/>
                </div>
                <Spacer y={3} />
                <div className="flex items-center gap-4 justify-between">
                    <TooltipTitle
                        classNames={{
                            title: "text-sm text-foreground-500",
                        }}
                        title="Status"
                        tooltipString="The status of the bot."
                    />
                    <KaniSkeleton className="w-[50px] h-5 rounded-md"/>
                </div>
                <Spacer y={3} />
                <KaniDivider/>
                <Spacer y={3} />
                <div className="flex items-center gap-4 justify-between">
                    <KaniSkeleton className="w-[50px] h-5 rounded-md"/>
                    <KaniSkeleton className="w-[50px] h-5 rounded-md"/>
                </div>
            </KaniCardBody>
        </KaniCard>
    )
}

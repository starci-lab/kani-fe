import React from "react"
import { KaniCard, KaniCardBody, KaniSkeleton } from "../../../../atomic"
import { TooltipTitle } from "../../../../reuseable"

export const List = () => {
    return (
        <KaniCard>
            <KaniCardBody>
                <div className="grid grid-cols-[120px_1fr_auto] md:grid-cols-[150px_2fr_3fr_125px_auto] items-center gap-4 w-full">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center">
                                <KaniSkeleton className="w-6 h-6 rounded-full z-10"/>
                                <KaniSkeleton className="w-6 h-6 rounded-full -ml-2"/>
                            </div>
                            <KaniSkeleton className="w-[50px] h-6 rounded-md"/>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 md:flex hidden">
                        <div className="flex items-center gap-2">
                            <TooltipTitle
                                classNames={{
                                    title: "text-sm text-foreground-500",
                                }}
                                title="ROI"
                                tooltipString="The return on investment, showing how much profit or loss the bot made compared to the initial position value."
                            />
                            <KaniSkeleton className="w-[50px] h-5 rounded-md"/>
                        </div>
                        <div className="flex items-center gap-2">
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
                    <div className="flex flex-col gap-3 md:flex hidden">
                        <div className="flex items-center gap-4">
                            <TooltipTitle
                                classNames={{
                                    title: "text-sm text-foreground-500",
                                }}
                                title="Funding"
                                tooltipString="The amount of funding the bot."
                            />
                            <KaniSkeleton className="w-[50px] h-5 rounded-md"/>
                        </div>
                        <div className="flex items-center gap-4">
                            <TooltipTitle
                                classNames={{
                                    title: "text-sm text-foreground-500",
                                }}
                                title="Status"
                                tooltipString="The status of the bot."
                            />
                            <KaniSkeleton className="w-[50px] h-5 rounded-md"/>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <KaniSkeleton className="w-[50px] h-5 rounded-md"/>
                        <KaniSkeleton className="w-[50px] h-5 rounded-md"/>
                    </div>
                    <KaniSkeleton className="w-[50px] h-5 rounded-md"/>
                </div>
            </KaniCardBody>
        </KaniCard>
    )
}

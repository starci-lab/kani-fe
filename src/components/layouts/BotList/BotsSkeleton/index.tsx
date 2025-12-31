import React from "react"
import { KaniCard, KaniCardBody, KaniDivider, KaniSkeleton } from "../../../atomic"
import { Spacer } from "@heroui/react"

export const BotsSkeleton = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
                <KaniCard key={index}>
                    <KaniCardBody>
                        <div className="flex items-center justify-between gap-4">
                            <KaniSkeleton className="w-[100px] h-6 rounded-md"/>
                            <KaniSkeleton className="w-[50px] h-6 rounded-full"/>
                        </div>
                        <Spacer y={6} />
                        <div className="flex justify-between items-center gap-4">
                            <div className="text-sm text-foreground-500">ROI</div>
                            <KaniSkeleton className="w-[50px] h-5 rounded-md"/>
                        </div>
                        <Spacer y={4} />
                        <KaniDivider/>
                        <Spacer y={4} />
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col gap-3 w-full">
                                <div className="flex justify-between items-center gap-4">
                                    <div className="text-sm text-foreground-500">Target</div>
                                    <div className="flex items-center gap-2">
                                        <KaniSkeleton className="w-5 h-5 rounded-full"/>
                                        <KaniSkeleton className="w-[50px] h-5 rounded-md"/>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="text-sm text-foreground-500">Quote</div>
                                    <div className="flex items-center gap-2">
                                        <KaniSkeleton className="w-5 h-5 rounded-full"/>
                                        <KaniSkeleton className="w-[50px] h-5 rounded-md"/>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="text-sm text-foreground-500">Gas</div>
                                    <div className="flex items-center gap-2">
                                        <KaniSkeleton className="w-5 h-5 rounded-full"/>
                                        <KaniSkeleton className="w-[50px] h-5 rounded-md"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </KaniCardBody>
                </KaniCard>
            ))}
        </div>
    )
}
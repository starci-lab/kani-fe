import { usePercentageWithdrawFormik } from "@/hooks/singleton"
import { KaniAlert, KaniInput, KaniLink, KaniSlider, KaniSwitch } from "../../../atomic"
import React from "react"
import { Spacer } from "@heroui/react"
import { TooltipTitle } from "../../../reuseable"
import { useAppSelector } from "@/redux"
import { truncateMiddle } from "@/modules/utils"
export const Percentage = () => {
    const formik = usePercentageWithdrawFormik()
    const bot = useAppSelector((state) => state.bot.bot)
    return (
        <div>
            <KaniAlert
                hideIcon
                classNames={{
                    base: "dark:bg-content2",
                }}
                title="Percentage withdrawal"
                description={
                    <div>
                    In percentage withdrawal mode, you will receive each token in proportion to your wallet balance. Gas sponsored by Kani. {" "}
                        <KaniLink href="https://kani.com/learn-more" underline="hover" className="text-primary text-xs">Learn more</KaniLink>
                    </div>}
            />
            <Spacer y={3} />
            <div className="flex flex-col gap-1.5">
                <TooltipTitle 
                    title="Percentage"
                    classNames={{
                        title: "text-sm",
                    }}
                />
                <div className="mb-1">
                    <KaniSlider
                        minValue={0}
                        maxValue={100}
                        value={formik.values.percentage}
                        marks={[
                            {
                                value: 25,
                                label: "25%",
                            },
                            {
                                value: 50,
                                label: "50%",
                            },
                            {
                                value: 75,
                                label: "75%",
                            },
                        ]}
                        onChange={(value) => formik.setFieldValue("percentage", value)}
                    />
                </div>
            </div>
            <Spacer y={3} />
            <div>
                <TooltipTitle
                    title="To USDC"
                    tooltipString="If enabled, the withdrawal amount will be converted to USDC"
                    isRequired
                />
                <Spacer y={1.5} />
                <div className="text-xs text-foreground-500">
                            If enabled, the withdrawal amount will be converted to USDC.
                </div>
                <Spacer y={3} />
                <KaniSwitch
                    isSelected={formik.values.toUsdc}
                    onValueChange={(value) => formik.setFieldValue("toUsdc", value)}
                />
            </div>
            <Spacer y={3} />
            <div className="flex flex-col gap-1.5">
                <TooltipTitle 
                    title="Withdrawal Address"
                    classNames={{
                        title: "text-sm",
                    }}
                />
                <KaniInput
                    isDisabled
                    value={truncateMiddle({ str: bot?.withdrawalAddress ?? "" })}
                />
            </div>
        </div>
    )
}
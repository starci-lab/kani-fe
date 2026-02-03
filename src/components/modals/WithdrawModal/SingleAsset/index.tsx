import { useSingleAssetWithdrawFormik } from "@/hooks/singleton"
import { KaniAlert, KaniInput, KaniLink } from "../../../atomic"
import React, { useMemo } from "react"
import { Spacer } from "@heroui/react"
import { TooltipTitle, WalletBalance } from "../../../reuseable"
import { SelectTokenDropdown } from "./SelectTokenDropdown"
import Decimal from "decimal.js"
import { useAppSelector } from "@/redux"
import { round, sanitizeNumericInput, sleep } from "@/modules/utils"

export const SingleAsset = () => {
    const formik = useSingleAssetWithdrawFormik()
    const prices = useAppSelector((state) => state.socket.prices)
    const tokenPrice = useMemo(() => prices[formik.values.tokenId ?? ""], [prices, formik.values.tokenId])
    return (
        <div>
            <KaniAlert
                hideIcon
                classNames={{
                    base: "dark:bg-content2",
                }}
                title="Single asset withdrawal"
                description={
                    <div>
                    In single asset withdrawal mode, you will receive a single asset from your wallet. Gas sponsored by Kani. {" "}
                        <KaniLink href="https://kani.com/learn-more" underline="hover" className="text-primary text-xs">Learn more</KaniLink>
                    </div>}
            />
            <Spacer y={3} />
            <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between gap-4">
                    <TooltipTitle 
                        title="Amount"
                        classNames={
                            {
                                title: "text-sm",
                            }
                        }
                    />
                    <WalletBalance amount={formik.values.balance ?? new Decimal(0)} 
                        onAction={(value) => {
                            switch (value) {
                            case "25%":
                                formik.setFieldValue("amount", (formik.values.balance?.mul(0.25) ?? new Decimal(0)).toString())
                                break
                            case "50%":
                                formik.setFieldValue("amount", (formik.values.balance?.mul(0.5) ?? new Decimal(0)).toString())
                                break
                            case "75%":
                                formik.setFieldValue("amount", (formik.values.balance?.mul(0.75) ?? new Decimal(0)).toString())
                                break
                            case "Max":
                                formik.setFieldValue("amount", (formik.values.balance ?? new Decimal(0)).toString())
                                break
                            }
                        }} 
                        showBalance={formik.values.showBalance} 
                    />
                </div>
                <div>
                    <KaniInput
                        classNames={{
                            inputWrapper: "h-16",
                            input: "w-fit text-end",
                            innerWrapper: "gap-2 justify-between"
                        }}
                        startContent={<SelectTokenDropdown />}
                        placeholder="Enter amount"
                        value={formik.values.amount}
                        onValueChange={(value) => {
                            const sanitizeInput = sanitizeNumericInput(value)
                            if (sanitizeInput != null) {
                                formik.setFieldValue("amount", sanitizeInput)
                            }
                        }}
                        onBlur={
                            async () => {
                                formik.setFieldTouched("amount", true)
                                await sleep(100)
                                formik.setFieldValue("showBalance", true)
                            }}
                        isInvalid={!!formik.errors.amount && !!formik.touched.amount}
                        onFocus={() => formik.setFieldValue("showBalance", false)}
                    />
                    <Spacer y={1.5} />
                    <div className="flex justify-between items-center">
                        <div className="text-xs text-danger">
                            {formik.touched.amount && formik.errors.amount}
                        </div>
                        <div className="flex justify-end">
                            <div className="text-xs text-foreground-500">
                            ~{round(new Decimal(formik.values.amount || 0)?.mul(tokenPrice?.price ?? 0) ?? new Decimal(0))} USD
                            </div>
                        </div>
                    </div>
                </div>
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
                    placeholder="Enter withdrawal address"
                    value={formik.values.withdrawalAddress}
                    onValueChange={(value) => formik.setFieldValue("withdrawalAddress", value)}
                    onBlur={() => formik.setFieldTouched("withdrawalAddress", true)}
                    errorMessage={formik.errors.withdrawalAddress}
                    isInvalid={!!formik.errors.withdrawalAddress && !!formik.touched.withdrawalAddress}
                />
            </div>
        </div>
    )
}
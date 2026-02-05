import { KaniButton, KaniInput, KaniLink } from "../../../../atomic"
import { TooltipTitle } from "../../../../reuseable"
import React from "react"
import { Spacer } from "@heroui/react"
import { useUpdateBotWithdrawalAddressFormik } from "@/hooks/singleton"

export const WithdrawalAddress = () => {
    const formik = useUpdateBotWithdrawalAddressFormik()
    return (
        <div>
            <TooltipTitle title="Withdrawal Address" />
            <Spacer y={1.5} />
            <div className="text-xs text-foreground-500">
                You must provide this address to allow Privy to enforce a withdrawal policy that
                restricts transfers to this address only.{" "}
                <KaniLink
                    className="text-xs"
                    href="https://docs.kani.com/how-it-works/withdrawal-address"
                    target="_blank"
                >
                    Learn more
                </KaniLink>
            </div>
            <Spacer y={3} />
            <KaniInput
                label=""
                labelPlacement="outside"
                placeholder="Enter withdrawal address"
                value={formik.values.withdrawalAddress ?? ""}
                onValueChange={(value) => formik.setFieldValue("withdrawalAddress", value)}
                onBlur={() => formik.setFieldTouched("withdrawalAddress", true)}
                isInvalid={!!(formik.errors.withdrawalAddress && formik.touched.withdrawalAddress)}
                errorMessage={formik.errors.withdrawalAddress}
            />
            <Spacer y={3} />
            <div className="flex gap-2">
                <KaniButton color="primary" variant="flat" onPress={() => formik.submitForm()}>
                    Save
                </KaniButton>
                <KaniButton color="primary" variant="light" onPress={() => formik.resetForm()}>
                    Reset
                </KaniButton>
            </div>
        </div>
    )
}

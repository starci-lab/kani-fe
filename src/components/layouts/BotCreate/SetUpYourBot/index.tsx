import React from "react"
import {
    KaniInput,
    KaniButton,
    KaniSwitch,
    KaniCheckbox,
    KaniLink,
} from "../../../atomic"
import { Spacer } from "@heroui/react"
import { TooltipTitle } from "../../../reuseable"
import { useCreateBotFormik } from "@/hooks/singleton"
import { SelectChainDropdown } from "./SelectChainDropdown"
import { SelectPools } from "./SelectPools"
import { SelectTokens } from "./SelectTokens"
export const SetUpYourBot = () => {
    const formik = useCreateBotFormik()
    return (
        <div>
            <div className="text-2xl font-bold">Set Up Your Bot</div>
            <Spacer y={6} />
            <div>
                <TooltipTitle
                    title="Name"
                    isRequired
                />
                <Spacer y={1.5} />
                <div className="text-xs text-foreground-500">
                A descriptive name to help you recognize this bot. Only visible to you.
                </div>
                <Spacer y={3} />
                <KaniInput
                    placeholder="Enter your bot name"
                    value={formik.values.name}
                    onValueChange={(value) => formik.setFieldValue("name", value)}
                    onBlur={() => formik.setFieldTouched("name", true)}
                    isInvalid={!!(formik.errors.name && formik.touched.name)}
                    errorMessage={formik.errors.name}
                />
            </div>
            <Spacer y={6} />
            <div>
                <TooltipTitle
                    title="Chain"
                    isRequired
                />
                <Spacer y={1.5} />
                <div className="text-xs text-foreground-500">
                Select the chain you want to use for your bot.
                </div>
                <Spacer y={3} />
                <div className="w-fit">
                    <SelectChainDropdown />
                </div>
            </div>
            <Spacer y={6} />
            <SelectTokens />
            <Spacer y={6} />
            <SelectPools />
            <Spacer y={6} />
            <div>
                <TooltipTitle
                    title="Exit To USDC"
                    tooltipString="This is the exit to USDC of your bot"
                    isRequired
                />
                <Spacer y={1.5} />
                <div className="text-xs text-foreground-500">
                If enabled, your bot will automatically move to USDC when a major price drop is detected.
                </div>
                <Spacer y={3} />
                <KaniSwitch
                    isSelected={formik.values.isExitToUsdc}
                    onValueChange={(value) => formik.setFieldValue("isExitToUsdc", value)}
                />
            </div>
            <Spacer y={6} />
            <div>
                <TooltipTitle
                    title="Withdrawal Address"
                    tooltipString="This is the withdrawal address of your bot. You must provide here(or update later) to let Privy add correct policy to protect your funds."
                />
                <Spacer y={1.5} />
                <div className="text-xs text-foreground-500">
                You must provide this address (or update it later) to allow Privy to enforce a withdrawal policy that restricts transfers to this address only. <KaniLink className="text-xs" href="https://docs.kani.com/how-it-works/withdrawal-address" target="_blank">Learn more</KaniLink>
                </div>
                <Spacer y={3} />
                <KaniInput
                    placeholder="Enter withdrawal address"
                    value={formik.values.withdrawalAddress}
                    onValueChange={(value) => formik.setFieldValue("withdrawalAddress", value)}
                    onBlur={() => formik.setFieldTouched("withdrawalAddress", true)}
                    errorMessage={formik.errors.withdrawalAddress}
                    isInvalid={!!(formik.errors.withdrawalAddress && formik.touched.withdrawalAddress)}
                />
            </div>
            <Spacer y={6} />
            <div className="flex gap-2">
                <KaniCheckbox
                    isSelected={formik.values.isTermsOfServiceAccepted}
                    onValueChange={(value) => formik.setFieldValue("isTermsOfServiceAccepted", value)}
                />
                <div className="text-xs text-foreground-500">
                    I accept the Terms of Service and acknowledge the risks involved.
                </div>
            </div>
            <Spacer y={3} />
            <KaniButton 
                isDisabled={!formik.isValid}
                size="lg"
                isLoading={formik.isSubmitting}
                color="primary" onPress={
                    () => {
                        formik.submitForm()
                    }
                }>
                Create Bot
            </KaniButton>
        </div>
    )
}

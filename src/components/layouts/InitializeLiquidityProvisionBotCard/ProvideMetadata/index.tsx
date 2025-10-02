import React from "react"
import { KaniCardHeader, KaniCardBody, KaniCardFooter, KaniButton, KaniInput } from "../../../atomic"
import { useInitializeLiquidityProvisionBotFormik } from "@/hooks/singleton"

export const ProvideMetadata = () => {
    const initializeLiquidityProvisionBotFormik = useInitializeLiquidityProvisionBotFormik()
    return <>
        <KaniCardHeader
            title="Provide Metadata"
            description="Provide the metadata for your liquidity provision bot."
        />
        <KaniCardBody>
            <KaniInput placeholder="Name" labelPlacement="outside-top" label="Name" value={
                initializeLiquidityProvisionBotFormik.values.name
            } onValueChange={(text) => {
                initializeLiquidityProvisionBotFormik.setFieldValue("name", text)
            }} />
        </KaniCardBody>
        <KaniCardFooter>
            <KaniButton 
            isDisabled={!initializeLiquidityProvisionBotFormik.isValid}
            isLoading={initializeLiquidityProvisionBotFormik.isSubmitting}
            onPress={
                async () => {
                    await initializeLiquidityProvisionBotFormik.submitForm()
                }
            }>Continue</KaniButton>
        </KaniCardFooter>
    </>
}
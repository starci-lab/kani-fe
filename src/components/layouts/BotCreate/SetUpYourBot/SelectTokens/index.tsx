import { KaniAlert, KaniAvatar, KaniButton } from "@/components/atomic"
import { TooltipTitle } from "@/components/reuseable"
import { useCreateBotFormik, useSelectTokenDisclosure } from "@/hooks/singleton"
import { useAppSelector } from "@/redux"
import { Spacer } from "@heroui/react"
import { PlusIcon } from "@phosphor-icons/react"
import React from "react"

export const SelectTokens = () => {
    const { onOpen } = useSelectTokenDisclosure()
    const formik = useCreateBotFormik()
    const tokens = useAppSelector(state => state.static.tokens)
    const targetToken = tokens.find(token => token.displayId === formik.values.targetTokenId)
    const quoteToken = tokens.find(token => token.displayId === formik.values.quoteTokenId)
    return (
        <div>
            <TooltipTitle
                title="Tokens"
                tooltipString="This is the tokens of your bot"
                isRequired
            />
            <Spacer y={2} />
            <KaniAlert
                variant="flat"
                color="warning"
                description={
                    <div className="text-xs flex flex-col gap-2">
                        <div>Kani bot always works with 2 tokens.</div>
                        <div>Target Token is the token you want to earn — for example, if you farm SOL, then SOL is the target token.</div>
                        <div>Quote Token is the token paired with the target to form the LP — for example, in a SOL-USDC pair, USDC is the quote token.</div>
                    </div>
                }
            />
            <Spacer y={4} />
            <div className="flex items-center gap-4">
                <div className="flex flex-col gap-2">
                    <KaniButton
                        variant="flat"
                        onPress={() => {
                            formik.setFieldValue("isTargetTokenSelected", true)
                            onOpen()
                        }}
                    >
                        {targetToken ? 
                            <div className="flex items-center gap-2">
                                <KaniAvatar src={targetToken.iconUrl} className="w-5 h-5"/>
                                <div className="text-sm">{targetToken.name}</div>
                            </div>
                            : 
                            "Select Target Token"
                        }
                    </KaniButton>
                </div>
                <PlusIcon/>
                <div className="flex flex-col gap-2">
                    <KaniButton
                        variant="flat"
                        onPress={() => {
                            formik.setFieldValue("isTargetTokenSelected", false)
                            onOpen()
                        }}
                    >
                        {
                            quoteToken 
                                ? <div className="flex items-center gap-2">
                                    <KaniAvatar src={quoteToken.iconUrl} className="w-5 h-5"/>
                                    <div className="text-sm">{quoteToken.name}</div>
                                </div>
                                : "Select Quote Token"
                        }
                    </KaniButton>
                </div>
            </div>
        </div>
    )
}
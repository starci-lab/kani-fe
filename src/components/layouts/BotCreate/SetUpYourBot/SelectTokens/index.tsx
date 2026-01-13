import { KaniAvatar, KaniButton, KaniLink } from "@/components/atomic"
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
    const targetToken = tokens.find(token => token.id === formik.values.targetTokenId)
    const quoteToken = tokens.find(token => token.id === formik.values.quoteTokenId)
    return (
        <div>
            <TooltipTitle
                title="Select Tokens"
                isRequired
            />
            <Spacer y={2} />
            <div className="text-xs text-foreground-500">
            Kani bots use two-token pools: Target Token is what you earn, Quote Token is the paired token. <KaniLink className="text-xs" href="https://docs.kani.com/how-it-works/target-and-quote-tokens" target="_blank">Learn more</KaniLink>
            </div>
            <Spacer y={4} />
            <div className="flex items-center gap-4">
                <div className="flex flex-col gap-2">
                    <KaniButton
                        variant="flat"
                        color="primary"
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
                        color="secondary"
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
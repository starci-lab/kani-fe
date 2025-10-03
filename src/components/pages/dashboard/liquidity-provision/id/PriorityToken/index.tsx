import React from "react"
import { KaniAvatar } from "@/components"
import { Spacer } from "@heroui/react"
import { Divider } from "@heroui/react"
import { useTranslations } from "next-intl"
import { TokenSchema } from "@/modules/types"
import { useBalanceSwr } from "@/hooks/reuseable"

export interface PriorityTokenProps {
    priorityToken: TokenSchema
    ownerAddress: string
}
export const PriorityToken = ({ priorityToken, ownerAddress }: PriorityTokenProps) => {
    const { data } = useBalanceSwr({
        tokenId: priorityToken.displayId,
        ownerAddress: ownerAddress,
    })
    const t = useTranslations("dashboard_liquidity_provision")
    return (
        <div className="bg-content2 rounded-medium px-3 py-2">
            <div className="flex items-center gap-2">
                <KaniAvatar src={priorityToken?.iconUrl}/>
                <div>
                    <div className="text-sm">{priorityToken?.name}</div>
                    <div className="text-xs text-foreground-500">{priorityToken?.symbol}</div>
                </div>
            </div>
            <Spacer y={2} />
            <Divider/>
            <Spacer y={2} />
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 justify-between">
                    <div className="text-sm">
                        {t("token_priority")}
                    </div>
                    <div className="text-sm">
                        {data?.balance.toString()}
                    </div>
                </div>
                <div className="flex items-center gap-2 justify-between">
                    <div className="text-sm">
                        {t("amount")}
                    </div>
                    <div className="text-sm">
                        {data?.balance.toString()}
                    </div>
                </div>
            </div>
        </div>
    )
}
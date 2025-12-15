import React, { useMemo } from "react"
import { 
    KaniButton, 
    KaniCard, 
    KaniCardBody, 
    KaniImage, 
    KaniLink, 
    ScrollableList, 
    SnippetIcon, 
    TooltipTitle 
} from "@/components"
import { getChainAssets } from "@/assets"
import { ChainId } from "@/modules/types"
import { useAppSelector } from "@/redux"
import { centerPad } from "@/modules/utils"
import { Spacer } from "@heroui/react"
import { 
    EyeIcon, 
    FloppyDiskBackIcon, 
    QrCodeIcon 
} from "@phosphor-icons/react"
import { useVerifyDisclosure } from "@/hooks/singleton"
import { PoolCard } from "./PoolCard"

export interface WalletAction {
    label: string
    icon: React.ElementType
    onPress: () => void
}

export const Wallet = () => {
    const bot = useAppSelector((state) => state.bot.bot)
    const chainAssets = getChainAssets(bot?.chainId ?? ChainId.Solana)
    const liquidityPools = useAppSelector((state) => state.static.liquidityPools)
    const { onOpen } = useVerifyDisclosure()
    const actions: Array<WalletAction> = [
        {
            label: "Deposit",
            icon: QrCodeIcon,
            onPress: () => {
            },
        },
        {
            label: "View on Explorer",
            icon: EyeIcon,
            onPress: () => {
            },
        },
        {
            label: "Export Private Key",
            icon: FloppyDiskBackIcon,
            onPress: () => {
                onOpen()
            },
        }
    ]

    const filteredLiquidityPools = useMemo(() => {
        return liquidityPools.filter((liquidityPool) => {
            return bot?.liquidityPools?.includes(liquidityPool.id)
        })
    }, [liquidityPools, bot?.liquidityPools])
    return (
        <div>
            <KaniCard>
                <KaniCardBody>
                    <TooltipTitle
                        title="Account"
                        tooltipString="The account address of the bot." />
                    <Spacer y={6} />
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                            <KaniImage
                                removeWrapper
                                className="w-5 h-5 min-w-5 min-h-5"
                                src={chainAssets.token}
                            />
                            <div className="text-sm">
                                {centerPad(bot?.accountAddress ?? "", 6, 4)}
                            </div>
                        </div>
                        <SnippetIcon
                            copyString={bot?.accountAddress ?? ""}
                            classNames={{ checkIcon: "w-5 h-5", copyIcon: "w-5 h-5" }}
                        />
                    </div>
                    <Spacer y={6} />
                    <div className="flex items-center gap-2">
                        {actions.map((action) => (
                            <KaniButton 
                                color="default" 
                                variant="flat" 
                                onPress={action.onPress}
                                isIconOnly 
                                key={action.label}
                            >
                                <action.icon className="w-5 h-5" />
                            </KaniButton>
                        ))}
                    </div>  
                </KaniCardBody>
            </KaniCard>
            <Spacer y={6} />
            <KaniCard>
                <KaniCardBody>
                    <div className="flex justify-between items-center">
                        <TooltipTitle
                            title="Pools"
                            tooltipString="The pools selected for the bot." />
                        <KaniLink
                            size="sm"
                            color="primary"
                        >
                            Manage
                        </KaniLink>    
                    </div>
                    <Spacer y={6} />
                    <ScrollableList
                        enableScroll={false}
                        items={filteredLiquidityPools}
                        renderItem={(liquidityPool) => {
                            return (
                                <PoolCard 
                                    key={liquidityPool.id} 
                                    liquidityPool={liquidityPool} 
                                />
                            )
                        }}
                    />
                </KaniCardBody>
            </KaniCard>
        </div>
    )
}
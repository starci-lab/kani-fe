import React from "react"
import { LiquidityPoolSchema } from "@/modules/types"
import { KaniAvatar, KaniAvatarGroup, KaniImage } from "../../atomic"
import { motion } from "framer-motion"
import { Chip, Spacer, cn } from "@heroui/react"
import { useAppSelector } from "@/redux"
import { computePercentage } from "@/modules/utils"
import { SnippetIcon } from "../SnippetIcon"
import Decimal from "decimal.js"

export interface LiquidityPoolCardProps {
    liquidityPool: LiquidityPoolSchema
    isSelected?: boolean
    onSelect?: () => void
}

export const LiquidityPoolCard = ({ liquidityPool, isSelected, onSelect }: LiquidityPoolCardProps) => {
    const tokens = useAppSelector(state => state.static.tokens)
    const tokenA = tokens.find(token => token.id === liquidityPool.tokenA)
    const tokenB = tokens.find(token => token.id === liquidityPool.tokenB)
    const dexes = useAppSelector(state => state.static.dexes)
    const dex = dexes.find(dex => dex.id === liquidityPool.dex)
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className={cn("w-full h-full cursor-pointer", 
                "rounded-xl transition-colors duration-300",
                isSelected ? "bg-primary/20" : "hover:bg-primary/10"
            )}
            onClick={onSelect}
        >
            <div className="flex justify-between items-center p-3">
                <div>
                    <div className="flex items-center gap-2">
                        <KaniAvatarGroup>
                            <KaniAvatar src={tokenA?.iconUrl} className="w-10 h-10" radius="full" />
                            <KaniAvatar src={tokenB?.iconUrl} className="w-10 h-10" radius="full" />
                        </KaniAvatarGroup>
                        <div>
                            <div className="text-sm">{tokenA?.name}-{tokenB?.name}</div>
                            <div className="text-xs text-foreground-500">{computePercentage(
                                { 
                                    numerator: new Decimal(liquidityPool.fee), 
                                    denominator: new Decimal(1) 
                                    }
                                ).toString()}%</div>
                        </div>
                    </div>
                    <Spacer y={2} />
                    <SnippetIcon 
                        copyString={liquidityPool.poolAddress ?? ""} 
                        classNames={{ 
                            checkIcon: "text-secondary w-5 h-5", 
                            copyIcon: "text-secondary w-5 h-5" 
                        }}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                        <KaniImage src={dex?.iconUrl} className="w-4 h-4" />
                        <div className="text-sm text-foreground-500">{dex?.name}</div>
                    </div>
                    <Chip color="primary" variant="flat">62.23% APR</Chip>
                </div>
            </div>
        </motion.div>
    )
}
import React, { useMemo } from "react"
import { 
    KaniAvatarGroup, 
    KaniAvatar, 
    KaniCard, 
    KaniCardBody, 
    PoolTypeChip, 
    KaniDivider
} from "@/components"
import { PositionSchema, TokenId } from "@/modules/types"
import { setSelectedPosition, useAppDispatch, useAppSelector } from "@/redux"
import { computePercentage, roundNumber } from "@/modules/utils"
import { Spacer } from "@heroui/react"
import Decimal from "decimal.js"
import { usePositionDisclosure } from "@/hooks/singleton"

export interface PositionCardProps {
    position: PositionSchema
}

export const PositionCard = ({ position }: PositionCardProps) => {
    const dispatch = useAppDispatch()
    const liquidityPools = useAppSelector((state) => state.static.liquidityPools)
    const liquidityPool = liquidityPools.find((pool) => pool.id === position.liquidityPool)
    const dexes = useAppSelector((state) => state.static.dexes)
    const tokens = useAppSelector((state) => state.static.tokens)
    const dex = useMemo(() => dexes.find((dex) => dex.id === liquidityPool?.dex), [dexes, liquidityPool?.dex])
    const tokenA = useMemo(() => tokens.find((token) => token.id === liquidityPool?.tokenA), [tokens, liquidityPool?.tokenA])
    const tokenB = useMemo(() => tokens.find((token) => token.id === liquidityPool?.tokenB), [tokens, liquidityPool?.tokenB])
    const [pnl, isPositivePnl] = useMemo(() => {
        const pnl = new Decimal(roundNumber(position.pnl ?? 0)).toNumber()
        return [pnl, new Decimal(pnl).isPositive()]
    }, [position.pnl])
    const [roi, isPositiveRoi] = useMemo(() => {
        const roi = new Decimal(roundNumber(position.roi ?? 0)).toNumber()
        return [roi, new Decimal(roi).isPositive()]
    }, [position.roi])
    const { onOpen } = usePositionDisclosure()
    const tokenPrices = useAppSelector((state) => state.socket.tokenPrices)

    const targetTokenPrice = useMemo(() => {
        return tokenPrices[tokenA?.displayId || TokenId.SolUsdc] ?? 0
    }, [tokenPrices, tokenA?.displayId])

    if (!liquidityPool) return null
    return (
        <KaniCard 
            shadow="none" 
            className="bg-content2" 
            isPressable 
            onPress={() => {
                dispatch(setSelectedPosition(position))
                onOpen()
            }}
        >
            <KaniCardBody>
                <div className="flex items-center gap-4 justify-between">
                    <div className="flex items-center gap-2 justify-start">
                        <div className="flex items-center gap-1">
                            <KaniAvatar
                                src={dex?.iconUrl}
                                classNames={{
                                    base: "w-5 h-5",
                                }}
                                radius="full"
                            />
                            <div className="text-sm">{dex?.name}</div>
                        </div>
                        <PoolTypeChip
                            type={liquidityPool.type}
                        />
                    </div>
                    <div className="flex items-center gap-2 justify-center">
                        <div className="flex items-center gap-1 justify-center">
                            <KaniAvatarGroup>
                                <KaniAvatar
                                    src={tokenA?.iconUrl}
                                    classNames={{
                                        base: "w-5 h-5",
                                    }}
                                    radius="full"
                                />
                                <KaniAvatar
                                    src={tokenB?.iconUrl}
                                    classNames={{
                                        base: "w-5 h-5",
                                    }}
                                    radius="full"
                                />
                            </KaniAvatarGroup>
                            <div className="text-sm">
                                {tokenA?.name}-{tokenB?.name}
                            </div>
                            <div className="flex items-center gap-1"></div>
                        </div>
                        <div className="flex items-center gap-1 justify-end">
                            <div className="text-sm">
                                {computePercentage(liquidityPool.fee, 1, 5).toString()}%
                            </div>
                        </div>
                    </div>
                </div>
                <Spacer y={4} />
                <KaniDivider />
                <Spacer y={4} />
                <div className="flex items-center gap-4 w-full justify-between">
                    <div className="text-sm text-foreground-500">PNL</div>
                    <div className={`text-sm ${isPositivePnl ? "text-success" : "text-danger"}`}>{roundNumber(pnl, 5)}%</div>
                </div>
                <Spacer y={3} />
                <div className="flex items-center gap-4 w-full justify-between">
                    <div className="text-sm text-foreground-500">ROI</div>
                    <div className={`text-sm ${isPositiveRoi ? "text-success" : "text-danger"}`}>{roundNumber(roi, 5)}%</div>
                </div>
                <Spacer y={3} />
                <div className="flex items-center gap-4 w-full justify-between">
                    <div className="text-sm text-foreground-500">Value</div>
                    <div className="text-sm">${roundNumber(new Decimal(position.positionValueAtOpen).mul(targetTokenPrice).toNumber(), 5)}</div>
                </div>
            </KaniCardBody>
        </KaniCard>
    )
}
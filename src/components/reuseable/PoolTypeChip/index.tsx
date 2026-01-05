import { KaniChip } from "@/components/atomic"
import { LiquidityPoolType } from "@/modules/types"
import { ChartBarIcon, ChartLineIcon } from "@phosphor-icons/react"
import React from "react"

interface PoolTypeChipProps {
    type: LiquidityPoolType;
}

export const PoolTypeChip = ({ type }: PoolTypeChipProps) => {
    const isClmm = type === LiquidityPoolType.Clmm
    return (
        <KaniChip className="px-3" classNames={{
            content:"pl-1 pr-0"
        }} 
        color={
            isClmm 
                ? "primary" 
                : "secondary"
        } 
        startContent={
            isClmm 
                ? <ChartLineIcon /> 
                : <ChartBarIcon />
        } variant="flat">
            {isClmm ? "CLMM" : "DLMM"}
        </KaniChip>
    )
}
import { 
    KaniButton, 
    KaniDivider, 
    KaniDrawer, 
    KaniDrawerBody, 
    KaniDrawerContent, 
    KaniDrawerFooter, 
    KaniDrawerHeader 
} from "../../atomic"
import React, { useMemo } from "react"
import { useQueryLiquidityPoolsUpdatePoolsSwr, useUpdatePoolsDisclosure } from "@/hooks/singleton"
import { Spacer } from "@heroui/react"
import { setUpdatePoolsFilters, useAppDispatch, useAppSelector } from "@/redux"
import { DexSelect, EmptyContent, PoolCard, PoolCardSkeleton, SortByDropdown, TextCheckbox, TextSwitch } from "../../reuseable"
import { ArrowClockwiseIcon } from "@phosphor-icons/react"
import { LiquidityPoolsSortBy } from "@/modules/api"
import { useUpdateBotLiquidityPoolsFormik } from "@/hooks/singleton"

export const UpdatePoolsDrawer = () => {
    const { isOpen, onOpenChange } = useUpdatePoolsDisclosure()
    const dexes = useAppSelector(state => state.static.dexes)
    const bot = useAppSelector(state => state.bot.bot)
    const updatePoolsFilters = useAppSelector(state => state.bot.updatePoolsFilters)
    const { data, isLoading } = useQueryLiquidityPoolsUpdatePoolsSwr()
    const filteredDexes = useMemo(() => {
        if (!bot) {
            return []
        }
        return dexes.filter(dex => dex?.chainIds?.includes(bot?.chainId))
    }, [dexes, bot])
    const dispatch = useAppDispatch()
    const updateBotLiquidityPoolsFormik = useUpdateBotLiquidityPoolsFormik()
    const isNoPoolsSelected = useMemo(() => {
        return updateBotLiquidityPoolsFormik.values.liquidityPoolIds.length === 0
    }, [updateBotLiquidityPoolsFormik.values.liquidityPoolIds])
    return (
        <KaniDrawer 
            isOpen={isOpen} 
            onOpenChange={onOpenChange} 
            onClose={
                () => {
                    updateBotLiquidityPoolsFormik.resetForm()
                }
            }
        >
            <KaniDrawerContent>
                <KaniDrawerHeader>
                    Update Pools
                </KaniDrawerHeader>
                <KaniDrawerBody className="flex-none">
                    <div className="mb-2">
                        <div>
                            <div className="flex gap-4 items-center justify-between">
                                <TextCheckbox
                                    text="Watchlist"
                                    isSelected={updatePoolsFilters?.watchlist ?? false}
                                    onValueChange={(value) => {
                                        dispatch(
                                            setUpdatePoolsFilters({
                                                ...updatePoolsFilters,
                                                watchlist: value
                                            }))
                                    }}
                                />
                                <div className="flex gap-2 items-center">
                                    <TextSwitch
                                        text="Incentivized"
                                        isSelected={updatePoolsFilters?.incentivized ?? true}
                                        onValueChange={(value) => {
                                            dispatch(
                                                setUpdatePoolsFilters({
                                                    ...updatePoolsFilters,
                                                    incentivized: value
                                                }))
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <Spacer y={3} />
                        <KaniDivider />
                        <Spacer y={3} />
                        <div className="w-full">
                            <div className="flex justify-between items-center gap-4">
                                <DexSelect  
                                    dexes={filteredDexes} selectedKeys={
                                        new Set(updatePoolsFilters.dexIds ?? [])} 
                                    onSelectionChange={(keys) => {
                                        dispatch(
                                            setUpdatePoolsFilters({
                                                ...updatePoolsFilters,
                                                dexIds: [...keys] as Array<string>
                                            }
                                            )
                                        )
                                    }
                                    }
                                />
                                <div className="flex items-center gap-2">
                                    <SortByDropdown 
                                        sortBy={updatePoolsFilters?.sortBy ?? LiquidityPoolsSortBy.Apr} asc={updatePoolsFilters?.asc ?? true} onSortByChange={(sortBy) => {
                                            dispatch(setUpdatePoolsFilters({
                                                ...updatePoolsFilters,
                                                sortBy
                                            }))
                                        }} onAscChange={(asc) => {
                                            dispatch(setUpdatePoolsFilters({
                                                ...updatePoolsFilters,
                                                asc
                                            }))
                                        }} 
                                    />
                                    <KaniButton variant="flat" isIconOnly>
                                        <ArrowClockwiseIcon className="w-5 h-5" />
                                    </KaniButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </KaniDrawerBody>
                <KaniDrawerBody className="flex-1">
                    {isLoading ? (
                        <div className="flex flex-col gap-3">
                            {Array.from({ length: 2 }).map((_, index) => (
                                <PoolCardSkeleton key={index} />
                            ))}
                        </div>
                    ) : (
                        data?.liquidityPools.data?.data?.length 
                        && data?.liquidityPools.data?.data?.length > 0 
                            ? (
                                <div>
                                    <div className="flex flex-col gap-3">
                                        {data?.liquidityPools.data?.data?.map((liquidityPool) => (
                                            <PoolCard 
                                                key={liquidityPool.id} 
                                                className="bg-content2 shadow-none"
                                                liquidityPool={liquidityPool} 
                                                isSelected={updateBotLiquidityPoolsFormik.values.liquidityPoolIds.includes(liquidityPool.id)}
                                                onPress={
                                                    (liquidityPool) => {
                                                        if (updateBotLiquidityPoolsFormik.values.liquidityPoolIds.includes(liquidityPool.id)) {
                                                            updateBotLiquidityPoolsFormik.setFieldValue(
                                                                "liquidityPoolIds", 
                                                                updateBotLiquidityPoolsFormik.values.liquidityPoolIds.filter((id) => id !== liquidityPool.id)
                                                            )
                                                        } else {
                                                            updateBotLiquidityPoolsFormik.setFieldValue(
                                                                "liquidityPoolIds", 
                                                                [...(updateBotLiquidityPoolsFormik.values.liquidityPoolIds ?? []), liquidityPool.id]
                                                            )
                                                        }
                                                    }}
                                            />
                                        ))}
                                    </div>
                                </div>  
                            ) : (
                                <EmptyContent
                                    title="No pools found"
                                    description="No pools found"
                                />
                            )
                    )}
                </KaniDrawerBody>
                <KaniDrawerFooter>
                    <KaniButton 
                        isDisabled={isNoPoolsSelected} 
                        color="primary" 
                        fullWidth 
                        onPress={() => {
                            updateBotLiquidityPoolsFormik.submitForm()
                        }}
                        isLoading={updateBotLiquidityPoolsFormik.isSubmitting}
                    >
                        {
                            isNoPoolsSelected ? "Select pools to continue" : "Confirm"
                        }
                    </KaniButton>
                </KaniDrawerFooter>
            </KaniDrawerContent>
        </KaniDrawer>    
    )
}
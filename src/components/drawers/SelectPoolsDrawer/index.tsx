import { 
    KaniButton, 
    KaniDivider, 
    KaniDrawer, 
    KaniDrawerBody, 
    KaniDrawerContent, 
    KaniDrawerHeader 
} from "../../atomic"
import React, { useMemo } from "react"
import { useQueryLiquidityPoolsSelectPoolsSwr, useSelectPoolsDisclosure, useCreateBotFormik } from "@/hooks/singleton"
import { Spacer } from "@heroui/react"
import { setSelectPoolsFilters, useAppDispatch, useAppSelector } from "@/redux"
import { DexSelect, EmptyContent, PoolCard, PoolCardSkeleton, RefreshIcon, SortByDropdown, TextCheckbox, TextSwitch } from "../../reuseable"
import { LiquidityPoolsSortBy } from "@/modules/api"

export const SelectPoolsDrawer = () => {
    const { isOpen, onOpenChange } = useSelectPoolsDisclosure()
    const dexes = useAppSelector(state => state.static.dexes)
    const selectPoolsFilters = useAppSelector(state => state.createBot.selectPoolsFilters)
    const { data, isLoading } = useQueryLiquidityPoolsSelectPoolsSwr()
    const createBotFormik = useCreateBotFormik()
    const filteredDexes = useMemo(() => {
        return dexes.filter(dex => dex?.chainIds?.includes(createBotFormik.values.chainId))
    }, [dexes, selectPoolsFilters.liquidityPools])
    const dispatch = useAppDispatch()
    return (
        <KaniDrawer 
            isOpen={isOpen} 
            onOpenChange={onOpenChange} 
        >
            <KaniDrawerContent>
                <KaniDrawerHeader>
                    Select Pools
                </KaniDrawerHeader>
                <KaniDrawerBody className="flex-none">
                    <div className="mb-2">
                        <div>
                            <div className="flex gap-4 items-center justify-between">
                                <TextCheckbox
                                    text="Watchlist"
                                    isSelected={selectPoolsFilters?.watchlist ?? false}
                                    onValueChange={(value) => {
                                        dispatch(
                                            setSelectPoolsFilters({
                                                ...selectPoolsFilters,
                                                watchlist: value
                                            }
                                            )
                                        )
                                    }}
                                />
                                <div className="flex gap-2 items-center">
                                    <TextSwitch
                                        text="Incentivized"
                                        isSelected={selectPoolsFilters?.incentivized ?? true}
                                        onValueChange={(value) => {
                                            dispatch(setSelectPoolsFilters({
                                                ...selectPoolsFilters,
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
                                        new Set(selectPoolsFilters.dexIds ?? [])} 
                                    onSelectionChange={(keys) => {
                                        dispatch(
                                            setSelectPoolsFilters({
                                                ...selectPoolsFilters,
                                                dexIds: [...keys] as Array<string>
                                            }
                                            )
                                        )
                                    }
                                    }
                                />
                                <div className="flex items-center gap-2">
                                    <SortByDropdown 
                                        sortBy={selectPoolsFilters?.sortBy ?? LiquidityPoolsSortBy.Apr} asc={selectPoolsFilters?.asc ?? true} onSortByChange={(sortBy) => {
                                            dispatch(setSelectPoolsFilters({
                                                ...selectPoolsFilters,
                                                sortBy
                                            }))
                                        }} onAscChange={(asc) => {
                                            dispatch(setSelectPoolsFilters({
                                                ...selectPoolsFilters,
                                                asc
                                            }))
                                        }} 
                                    />
                                    <KaniButton variant="flat" isIconOnly>
                                        <RefreshIcon />
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
                                                isSelected={createBotFormik.values.liquidityPoolIds.includes(liquidityPool.id)}
                                                onPress={
                                                    (liquidityPool) => {
                                                        if (createBotFormik.values.liquidityPoolIds.includes(liquidityPool.id)) {
                                                            createBotFormik.setFieldValue(
                                                                "liquidityPoolIds", 
                                                                createBotFormik.values.liquidityPoolIds.filter((id) => id !== liquidityPool.id)
                                                            )
                                                        } else {
                                                            createBotFormik.setFieldValue(
                                                                "liquidityPoolIds", 
                                                                [...(createBotFormik.values.liquidityPoolIds ?? []), liquidityPool.id]
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
            </KaniDrawerContent>
        </KaniDrawer>    
    )
}
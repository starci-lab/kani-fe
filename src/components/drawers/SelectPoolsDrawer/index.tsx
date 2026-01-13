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
import { useQueryLiquidityPools2SelectPoolsSwr, useSelectPoolsDisclosure, useCreateBotFormik } from "@/hooks/singleton"
import { Spacer } from "@heroui/react"
import { setSelectPoolsFilters, useAppDispatch, useAppSelector } from "@/redux"
import { DexSelect, EmptyContent, PoolCard, PoolCardSkeleton, SortByDropdown, TextCheckbox, TextSwitch } from "../../reuseable"
import { ArrowClockwiseIcon } from "@phosphor-icons/react"
import { LiquidityPools2SortBy } from "@/modules/api"

export const SelectPoolsDrawer = () => {
    const { isOpen, onOpenChange } = useSelectPoolsDisclosure()
    const dexes = useAppSelector(state => state.static.dexes)
    const selectPoolsFilters = useAppSelector(state => state.createBot.selectPoolsFilters)
    const { data, isLoading } = useQueryLiquidityPools2SelectPoolsSwr()
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
                    Update Pools
                </KaniDrawerHeader>
                <KaniDrawerBody className="flex-none">
                    <div className="mb-3">
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
                                        sortBy={selectPoolsFilters?.sortBy ?? LiquidityPools2SortBy.Apr} asc={selectPoolsFilters?.asc ?? true} onSortByChange={(sortBy) => {
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
                        data?.liquidityPools2.data?.data?.length 
                        && data?.liquidityPools2.data?.data?.length > 0 
                            ? (
                                <div>
                                    <div className="flex flex-col gap-3">
                                        {data?.liquidityPools2.data?.data?.map((liquidityPool) => (
                                            <PoolCard 
                                                key={liquidityPool.id} 
                                                className="bg-content2"
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
                <KaniDrawerFooter>
                    <KaniButton 
                        isDisabled={createBotFormik.values.liquidityPoolIds.length === 0} 
                        color="primary" 
                        fullWidth 
                        onPress={() => {
                            createBotFormik.submitForm()
                        }}
                        isLoading={createBotFormik.isSubmitting}
                    >
                        {
                            createBotFormik.values.liquidityPoolIds.length === 0 ? "Select pools to continue" : "Confirm"
                        }
                    </KaniButton>
                </KaniDrawerFooter>
            </KaniDrawerContent>
        </KaniDrawer>    
    )
}
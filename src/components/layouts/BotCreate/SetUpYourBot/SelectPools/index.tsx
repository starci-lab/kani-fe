import { PoolCard, PoolCardSkeleton, TooltipTitle } from "../../../../reuseable"
import {
    useCreateBotFormik,
    useQueryLiquidityPoolsSelectedPoolsSwr,
    useSelectPoolsDisclosure,
} from "@/hooks/singleton"
import React, { useMemo } from "react"
import { Spacer } from "@heroui/react"
import { KaniButton } from "../../../../atomic" 

export const SelectPools = () => {
    const { onOpen } = useSelectPoolsDisclosure()
    const formik = useCreateBotFormik()
    const { data, isLoading } = useQueryLiquidityPoolsSelectedPoolsSwr()
    const selectedLiquidityPools = useMemo(() => {
        return data?.liquidityPools.data?.data?.filter((liquidityPool) =>
            formik.values.liquidityPoolIds?.includes(liquidityPool.id)
        );
    }, [data?.liquidityPools.data?.data, formik.values.liquidityPoolIds])
    return (
        <div className="flex flex-col">
            <TooltipTitle
                title="Select Pools"
                tooltipString="This is the pools of your bot"
                isRequired
            />
            <Spacer y={1.5} />
            <div>
                {
                    !formik.values.liquidityPoolIds.length ? (
                    <>      
                        <div className="text-xs text-foreground-500">
                            Kani automatically selects the best-performing pools for you. You
                            can still choose manually if you prefer.
                        </div>
                    </>
                ) : (
                    <div>
                        <div className="text-xs text-foreground-500">
                            You can only select up to 3 pools.
                        </div>
                        <Spacer y={4} />
                        <div className="flex flex-col gap-3">
                            {(isLoading || !data) ? (
                                <div className="flex flex-col gap-3">
                                    {Array.from({ length: 2 }).map((_, index) => (
                                        <PoolCardSkeleton key={index} />
                                    ))}
                                </div>
                            ) : (
                                selectedLiquidityPools?.map((liquidityPool) => (
                                <PoolCard
                                    key={liquidityPool.id}
                                    liquidityPool={liquidityPool}
                                    />
                                ))
                            )}
                        </div>      
                    </div>
                )}
            </div>
            <Spacer y={3} />
            <div className="flex items-center gap-2">
                <KaniButton
                    isDisabled={
                        !formik.values.targetTokenId || !formik.values.quoteTokenId
                    }
                    variant="flat"
                    onPress={onOpen}
                >
                    Select Pools
                </KaniButton>
                {formik.values.liquidityPoolIds.length > 0 && (
                    <KaniButton
                        variant="light"
                        onPress={() => {
                            formik.setFieldValue("liquidityPoolIds", []);
                        }}
                    >
                        Reset
                    </KaniButton>
                )}
            </div>
        </div>
    );
};

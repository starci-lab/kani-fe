import { TooltipTitle } from "@/components/reuseable"
import {
    useCreateBotFormik,
    useSelectPoolsDisclosure,
} from "@/hooks/singleton"
import { useAppSelector } from "@/redux"
import React, { useMemo } from "react"
import { PoolCard } from "./PoolCard"
import { Spacer } from "@heroui/react"
import { KaniButton } from "@/components/atomic"

export const SelectPools = () => {
    const { onOpen } = useSelectPoolsDisclosure()
    const formik = useCreateBotFormik()
    const liquidityPools = useAppSelector((state) => state.static.liquidityPools)
    const selectedLiquidityPools = useMemo(() => {
        return liquidityPools.filter((liquidityPool) =>
            formik.values.liquidityPoolIds?.includes(liquidityPool.displayId)
        );
    }, [liquidityPools, formik.values.liquidityPoolIds])
    return (
        <div className="flex flex-col">
            <TooltipTitle
                title="Select Pools"
                tooltipString="This is the pools of your bot"
                isRequired
            />
            <div>
                {
                    !formik.values.liquidityPoolIds.length ? (
                    <>
                        <Spacer y={3} />
                        <div className="text-xs text-foreground-500">
                            Kani automatically selects the best-performing pools for you. You
                            can still choose manually if you prefer.
                        </div>
                    </>
                ) : (
                    <div>
                        <Spacer y={3} />
                        <div className="flex flex-col gap-3">
                            {selectedLiquidityPools.map((liquidityPool) => (
                                <PoolCard
                                    key={liquidityPool.id}
                                    liquidityPool={liquidityPool}
                                />
                            ))}
                        </div>
                        <Spacer y={3} />
                        <div className="text-xs text-foreground-500">
                            You can only select up to 3 pools.
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
                        color="danger"
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

    import React from "react"
import {
    KaniButton,
    KaniCardBody,
    KaniCardFooter,
    KaniCardHeader,
} from "../../../atomic"
import { ScrollableList, ScrollableListSkeleton } from "../../../reuseable"
import {
    InitializeLiquidityProvisionBotCardPage,
    setInitializeLiquidityProvisionBotCard,
    useAppDispatch,
    useAppSelector,
} from "@/redux"
import { useQueryStaticSwrMutation } from "@/hooks/singleton"
import { WrapperLiquidityPoolCard } from "./WrapperLiquidityPoolCard"

export const SelectLiquidityPools = () => {
    const dispatch = useAppDispatch()
    const liquidityPools = useAppSelector(state => state.static.liquidityPools)
    const { isLoading } = useQueryStaticSwrMutation()
    return (
        <>
            <KaniCardHeader
                title="Select Liquidity Pools"
                description="Select the liquidity pools you want to use for your liquidity provision bot."
            />
            <KaniCardBody>
                {isLoading ? <ScrollableListSkeleton /> : <ScrollableList items={liquidityPools} renderItem={
                    (liquidityPool) => <WrapperLiquidityPoolCard key={liquidityPool.id} liquidityPool={liquidityPool} />
                } />}
            </KaniCardBody>
            <KaniCardFooter className="gap-2">
                <KaniButton
                    color="default"
                    variant="flat"
                    fullWidth
                    onPress={() => {
                        dispatch(
                            setInitializeLiquidityProvisionBotCard(
                                InitializeLiquidityProvisionBotCardPage.SelectPriorityToken
                            )
                        );
                    }}
                >
                    Back
                </KaniButton>
                <KaniButton
                    color="primary"
                    fullWidth
                    onPress={() => {
                        dispatch(
                            setInitializeLiquidityProvisionBotCard(
                                InitializeLiquidityProvisionBotCardPage.ProvideMetadata
                            )
                        );
                    }}
                >
                    Continue
                </KaniButton>
            </KaniCardFooter>
        </>
    );
};

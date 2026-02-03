"use client"
import { 
    KaniButton, 
    KaniModal, 
    KaniModalBody, KaniModalContent, KaniModalFooter, KaniModalHeader, KaniTab, KaniTabs } from "../../atomic"
import { useWithdrawDisclosure } from "@/hooks/singleton"
import React, { useMemo } from "react"
import { useAppSelector, WithdrawTab, setBotWithdrawTab } from "@/redux"
import { useAppDispatch } from "@/redux"
import { Percentage } from "./Percentage"
import { Spacer } from "@heroui/react"
import { SingleAsset } from "./SingleAsset"
import { useSingleAssetWithdrawFormik, usePercentageWithdrawFormik } from "@/hooks/singleton"

export const WithdrawModal = () => {
    const { isOpen, onOpenChange, onClose } = useWithdrawDisclosure()
    const singleAssetFormik = useSingleAssetWithdrawFormik()
    const percentageFormik = usePercentageWithdrawFormik()
    const withdrawTab = useAppSelector((state) => state.bot.withdrawTab)
    const formik = useMemo(() => {
        switch (withdrawTab) {
        case WithdrawTab.Percentage:
            return percentageFormik
        case WithdrawTab.SingleAsset:
            return singleAssetFormik
        }
    }, [singleAssetFormik, percentageFormik, withdrawTab])
    const tabs = [
        {
            key: WithdrawTab.Percentage,
            title: "Percentage",
        },
        {
            key: WithdrawTab.SingleAsset,
            title: "Single Asset",
        },
    ]
    const renderTab = () => {
        switch (withdrawTab) {
        case WithdrawTab.Percentage:
            return <Percentage />
        case WithdrawTab.SingleAsset:
            return <SingleAsset />
        }
    }
    const dispatch = useAppDispatch()
    return (
        <KaniModal size="sm" isOpen={isOpen} onOpenChange={onOpenChange} onClose={
            () => {
                onClose()
                formik.resetForm()
                percentageFormik.resetForm()
            }}>
            <KaniModalContent>
                <KaniModalHeader title="Withdraw" />
                <KaniModalBody>
                    <KaniTabs
                        color="primary"
                        disableAnimation
                        selectedKey={withdrawTab}
                        onSelectionChange={
                            (key) => {
                                const _key = key as WithdrawTab
                                dispatch(setBotWithdrawTab(_key))
                            }
                        }
                        classNames={{
                            tabList: "w-full"
                        }}
                    >
                        {
                            tabs.map(
                                (tab) => (
                                    <KaniTab key={tab.key} title={tab.title} className="w-full" />
                                )
                            )
                        }
                    </KaniTabs>
                    <Spacer y={6} />
                    {renderTab()}
                </KaniModalBody>
                <KaniModalFooter>
                    <KaniButton 
                        color="primary" 
                        isLoading={formik.isSubmitting} 
                        className="flex-1" 
                        onPress={
                            async () => {
                                await formik.submitForm()
                            }
                        }>    
                    Proceed
                    </KaniButton>
                </KaniModalFooter>
            </KaniModalContent>
        </KaniModal>
    )
}
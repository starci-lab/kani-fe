"use client"
import {
    KaniButton,
    KaniModal,
    KaniModalBody, KaniModalContent, KaniModalFooter, KaniModalHeader, KaniTab, KaniTabs
} from "../../atomic"
import { useWithdrawDisclosure } from "@/hooks/singleton"
import React, { useMemo } from "react"
import { 
    useAppSelector, 
    WithdrawTab, 
    setWithdrawModalTab, 
    setMFAVerificationModalIsActionPending,
    setWithdrawalExecuting 
} from "@/redux"
import { useAppDispatch } from "@/redux"
import { Percentage } from "./Percentage"
import { Spacer } from "@heroui/react"
import { SingleAsset } from "./SingleAsset"
import { useSingleAssetWithdrawFormik, usePercentageWithdrawFormik } from "@/hooks/singleton"
import { WithdrawalExecuting } from "./WithdrawalExecuting"

export const WithdrawModal = () => {
    const { isOpen, onOpenChange, onClose } = useWithdrawDisclosure()
    const singleAssetFormik = useSingleAssetWithdrawFormik()
    const percentageFormik = usePercentageWithdrawFormik()
    const withdrawTab = useAppSelector((state) => state.modals.withdraw.tab)
    const isActionPending = useAppSelector((state) => state.modals.mfaVerification.isActionPending)
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
    const withdrawalExecuting = useAppSelector((state) => state.modals.withdraw.withdrawalExecuting)
    const onCloseModal = () => {
        onClose()
        dispatch(setWithdrawalExecuting(false))
        dispatch(setMFAVerificationModalIsActionPending(false))
        formik.resetForm()
        percentageFormik.resetForm()
    }
    return (
        <KaniModal size="md" isOpen={isOpen} onOpenChange={onOpenChange} onClose={
            () => {
                onCloseModal()
            }}>
            <KaniModalContent>
                <KaniModalHeader title="Withdraw" />
                {
                    withdrawalExecuting ? (
                        <>
                            <KaniModalBody>
                                <WithdrawalExecuting />
                            </KaniModalBody>
                            <KaniModalFooter>
                                <KaniButton
                                    color="primary"
                                    className="flex-1"
                                    onPress={
                                        async () => {
                                            onCloseModal()
                                        }
                                    }>
                                    Close
                                </KaniButton>
                            </KaniModalFooter>
                        </>
                    ) : (
                        <>
                            <KaniModalBody>
                                <KaniTabs
                                    color="primary"
                                    disableAnimation
                                    selectedKey={withdrawTab}
                                    onSelectionChange={
                                        (key) => {
                                            const _key = key as WithdrawTab
                                            dispatch(setWithdrawModalTab(_key))
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
                                    isLoading={formik.isSubmitting || isActionPending}
                                    className="flex-1"
                                    isDisabled={!formik.isValid}
                                    onPress={
                                        async () => {
                                            await formik.submitForm()
                                        }
                                    }>
                                    Proceed
                                </KaniButton>
                            </KaniModalFooter>
                        </>
                    )
                }
            </KaniModalContent>
        </KaniModal >
    )
}
"use client"
import { KaniButton, KaniModal, KaniModalBody, KaniModalContent, KaniModalFooter, KaniModalHeader, KaniTab, KaniTabs } from "../../atomic"
import { useWithdrawDisclosure } from "@/hooks/singleton"
import React from "react"
import { useAppSelector, WithdrawTab, setBotWithdrawTab } from "@/redux"
import { useAppDispatch } from "@/redux"
import { Percentage } from "./Percentage"
import { Spacer } from "@heroui/react"

export const WithdrawModal = () => {
    const { isOpen, onOpenChange } = useWithdrawDisclosure()
    const withdrawTab = useAppSelector((state) => state.bot.withdrawTab)
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
            return <div>Single Asset</div>
        }
    }
    const dispatch = useAppDispatch()
    return (
        <KaniModal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
            <KaniModalContent>
                <KaniModalHeader title="Withdraw" />
                <KaniModalBody>
                    <KaniTabs
                        size="sm"
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
                    <KaniButton color="default" className="flex-1">
                        Cancel
                    </KaniButton>
                    <KaniButton color="primary" className="flex-1">    
                    Proceed
                    </KaniButton>
                </KaniModalFooter>
            </KaniModalContent>
        </KaniModal>
    )
}
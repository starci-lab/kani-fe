"use client "
import React from "react"
import {
    KaniModal,
    KaniModalContent,
    KaniModalHeader,
    KaniModalBody,
    KaniScrollShadow,
} from "../../atomic"
import { useCreateBotFormik, useViolateIndicatorRulesDisclosure } from "@/hooks/singleton"
import { ViolateIndicatorCard } from "./ViolateIndicatorCard"

export const EditViolateIndicatorRulesModal = () => {
    const { isOpen, onOpenChange } = useViolateIndicatorRulesDisclosure()
    const formik = useCreateBotFormik()
    return (
        <KaniModal isOpen={isOpen} onOpenChange={onOpenChange}>
            <KaniModalContent>
                <KaniModalHeader title="Edit Violate Indicator Rules" />
                <KaniModalBody>
                    <KaniScrollShadow className="max-h-[400px]">
                        <div className="flex flex-col gap-3">
                            {
                                formik.values.violateIndicators?.map((violateIndicator) => {
                                    return <ViolateIndicatorCard key={violateIndicator.name} violateIndicator={violateIndicator} />
                                })
                            }
                        </div>
                    </KaniScrollShadow>
                </KaniModalBody>
            </KaniModalContent>
        </KaniModal>
    )
}
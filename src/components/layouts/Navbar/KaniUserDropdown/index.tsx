"use client"
import React from "react"
import {
    KaniButton,
    KaniDropdown,
    KaniDropdownItem,
    KaniDropdownMenu,
    KaniDropdownSection,
    KaniDropdownTrigger,
} from "@/components/atomic"
import { usePrivy, useMfaEnrollment } from "@privy-io/react-auth"
import { truncateWithEllipsis } from "@/modules/utils"

import { 
    AtIcon, 
    PencilLineIcon, 
    SignOutIcon 
} from "@phosphor-icons/react"
import useSWRMutation from "swr/mutation"

export const KaniUserDropdown = () => {
    const { logout, user } = usePrivy()
    const {showMfaEnrollmentModal} = useMfaEnrollment()
    const logoutSwrMutation = useSWRMutation(
        "LOGOUT_SWR_MUTATION", 
        async () => {
            return await logout()
        })
    return (
        <KaniDropdown>
            <KaniDropdownTrigger>
                <KaniButton isLoading={logoutSwrMutation.isMutating} variant="bordered">
                    {truncateWithEllipsis(user?.email?.address ?? "")}
                </KaniButton>
            </KaniDropdownTrigger>
            <KaniDropdownMenu aria-label="Static Actions">
                <KaniDropdownSection showDivider>
                    <KaniDropdownItem 
                        isReadOnly 
                        key="your-email"
                        startContent={<AtIcon />}
                    >
                        {user?.email?.address ?? ""}
                    </KaniDropdownItem>
                    <KaniDropdownItem 
                        key="enroll-in-mfa"
                        startContent={<PencilLineIcon />}
                        onPress={() => showMfaEnrollmentModal()}
                    >
                    Enroll in MFA
                    </KaniDropdownItem>
                </KaniDropdownSection>
                <KaniDropdownSection>
                    <KaniDropdownItem
                        startContent={<SignOutIcon />}
                        key="sign-out"
                        className="text-danger"
                        onPress={() => logoutSwrMutation.trigger()}
                    >
                    Sign Out
                    </KaniDropdownItem>
                </KaniDropdownSection>
            </KaniDropdownMenu>
        </KaniDropdown>
    )
}

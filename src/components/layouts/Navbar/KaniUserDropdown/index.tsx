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

export const KaniUserDropdown = () => {
    const { logout, user } = usePrivy()
    const {showMfaEnrollmentModal} = useMfaEnrollment()
    return (
        <KaniDropdown>
            <KaniDropdownTrigger>
                <KaniButton variant="bordered">
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
                        onPress={() => logout()}
                    >
                    Sign Out
                    </KaniDropdownItem>
                </KaniDropdownSection>
            </KaniDropdownMenu>
        </KaniDropdown>
    )
}

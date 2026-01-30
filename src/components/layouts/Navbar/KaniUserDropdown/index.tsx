"use client"
import React from "react"
import {
    KaniButton,
    KaniDropdown,
    KaniDropdownItem,
    KaniDropdownMenu,
    KaniDropdownSection,
    KaniDropdownTrigger,
} from "../../../atomic"
import { truncateEnd } from "@/modules/utils"
import { 
    AtIcon, 
    PencilLineIcon, 
    SignOutIcon 
} from "@phosphor-icons/react"
import { usePrivy, useMfaEnrollment, useLogout } from "@privy-io/react-auth"

export const KaniUserDropdown = () => {
    const { user } = usePrivy()
    const { logout } = useLogout()
    const { showMfaEnrollmentModal } = useMfaEnrollment()
    return (
        <KaniDropdown>
            <KaniDropdownTrigger>
                <KaniButton variant="bordered">
                    {truncateEnd({ str: user?.email?.address.toString() ?? "" })}
                </KaniButton>
            </KaniDropdownTrigger>
            <KaniDropdownMenu aria-label="Static Actions" disabledKeys={user?.mfaMethods.length ? ["enroll-in-mfa"] : []}>
                <KaniDropdownSection showDivider>
                    <KaniDropdownItem 
                        isReadOnly 
                        key="your-email"
                        startContent={<AtIcon />}
                    >
                        {user?.email?.address.toString() ?? ""}
                    </KaniDropdownItem>
                    <KaniDropdownItem 
                        key="enroll-in-mfa"
                        startContent={<PencilLineIcon />}
                        onPress={() => {
                            showMfaEnrollmentModal()
                        }}
                    >
                    Enroll in MFA
                    </KaniDropdownItem>
                </KaniDropdownSection>
                <KaniDropdownSection>
                    <KaniDropdownItem
                        startContent={<SignOutIcon />}
                        key="sign-out"
                        className="text-danger"
                        onPress={() => {
                            logout()
                        }}
                    >
                    Sign Out
                    </KaniDropdownItem>
                </KaniDropdownSection>
            </KaniDropdownMenu>
        </KaniDropdown>
    )
}

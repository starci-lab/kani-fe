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
import { usePrivy, useLogout, useMfaEnrollment } from "@privy-io/react-auth"
import { useManageMFASettingsDisclosure } from "@/hooks/singleton"

export const KaniUserDropdown = () => {
    const { onOpen } = useManageMFASettingsDisclosure()
    const { user } = usePrivy()
    const { showMfaEnrollmentModal } = useMfaEnrollment()
    const { logout } = useLogout()
    return (
        <KaniDropdown>
            <KaniDropdownTrigger>
                <KaniButton variant="bordered">
                    {truncateEnd({ str: user?.email?.address.toString() ?? "" })}
                </KaniButton>
            </KaniDropdownTrigger>
            <KaniDropdownMenu aria-label="Static Actions">
                <KaniDropdownSection showDivider>
                    <KaniDropdownItem 
                        isReadOnly 
                        key="your-email"
                        startContent={<AtIcon />}
                    >
                        {user?.email?.address.toString() ?? ""}
                    </KaniDropdownItem>
                    <KaniDropdownItem 
                        key="manage-mfa-settings"
                        startContent={<PencilLineIcon />}
                        onPress={() => {
                            onOpen()
                        }}
                    >
                    Manage MFA Settings
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
                <KaniDropdownSection>
                    <KaniDropdownItem
                        startContent={<SignOutIcon />}
                        key="sign-out"
                        className="text-danger"
                        onPress={() => {
                            showMfaEnrollmentModal()
                        }}
                    >
                    Delete Account
                    </KaniDropdownItem>
                </KaniDropdownSection>
            </KaniDropdownMenu>
        </KaniDropdown>
    )
}

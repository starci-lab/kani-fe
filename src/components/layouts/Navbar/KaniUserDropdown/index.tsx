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
import { usePrivy, useLogout } from "@privy-io/react-auth"
import { useEnableMFADisclosure } from "@/hooks/singleton"
import { useAppSelector } from "@/redux"

export const KaniUserDropdown = () => {
    const { onOpen } = useEnableMFADisclosure()
    const { user } = usePrivy()
    const { logout } = useLogout()
    const userState = useAppSelector((state) => state.session.user)
    return (
        <KaniDropdown>
            <KaniDropdownTrigger>
                <KaniButton variant="bordered">
                    {truncateEnd({ str: user?.email?.address.toString() ?? "" })}
                </KaniButton>
            </KaniDropdownTrigger>
            <KaniDropdownMenu aria-label="Static Actions" disabledKeys={userState?.mfaEnabled ? ["enable-mfa"] : []}>
                <KaniDropdownSection showDivider>
                    <KaniDropdownItem 
                        isReadOnly 
                        key="your-email"
                        startContent={<AtIcon />}
                    >
                        {user?.email?.address.toString() ?? ""}
                    </KaniDropdownItem>
                    <KaniDropdownItem 
                        key="enable-mfa"
                        startContent={<PencilLineIcon />}
                        onPress={() => {
                            onOpen()
                        }}
                    >
                    Enable MFA
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

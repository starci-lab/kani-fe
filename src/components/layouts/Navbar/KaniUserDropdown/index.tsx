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
import { truncateWithEllipsis } from "@/modules/utils"
import { signOut, useAppDispatch, useAppSelector } from "@/redux"
import { 
    AtIcon, 
    PencilLineIcon, 
    SignOutIcon 
} from "@phosphor-icons/react"
import { useEnableMFAModalDisclosure } from "@/hooks/singleton"

export const KaniUserDropdown = () => {
    const user = useAppSelector((state) => state.session.user)
    const { onOpen } = useEnableMFAModalDisclosure()
    const dispatch = useAppDispatch()
    return (
        <KaniDropdown>
            <KaniDropdownTrigger>
                <KaniButton variant="bordered">
                    {truncateWithEllipsis(user?.email ?? "")}
                </KaniButton>
            </KaniDropdownTrigger>
            <KaniDropdownMenu aria-label="Static Actions" disabledKeys={user?.mfaEnabled ? ["enroll-in-mfa"] : []}>
                <KaniDropdownSection showDivider>
                    <KaniDropdownItem 
                        isReadOnly 
                        key="your-email"
                        startContent={<AtIcon />}
                    >
                        {user?.email ?? ""}
                    </KaniDropdownItem>
                    <KaniDropdownItem 
                        key="enroll-in-mfa"
                        startContent={<PencilLineIcon />}
                        onPress={() => {
                            onOpen()
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
                            dispatch(signOut())
                        }}
                    >
                    Sign Out
                    </KaniDropdownItem>
                </KaniDropdownSection>
            </KaniDropdownMenu>
        </KaniDropdown>
    )
}

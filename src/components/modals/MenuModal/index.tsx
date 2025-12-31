import { 
    KaniModal, 
    KaniModalHeader, 
    KaniModalBody, 
    KaniModalContent,
    KaniDivider,
    KaniListbox, 
    KaniListboxItem,
} from "../../atomic"
import { useMenuModalDisclosure } from "@/hooks/singleton"
import React from "react"
import { SwitchThemeButton } from "../../reuseable"
import { Spacer, LinkIcon } from "@heroui/react"
import { SidebarItem } from "../../layouts"
import { setSidebarTab, SidebarTab, useAppDispatch, useAppSelector } from "@/redux"
import { RobotIcon, UserIcon, BookIcon, LifebuoyIcon } from "@phosphor-icons/react"

export const MenuModal = () => {
    const { isOpen, onOpenChange } = useMenuModalDisclosure()
    const sidebarTab = useAppSelector((state) => state.routes.sidebarTab)
    const dispatch = useAppDispatch()
    const tabs1: Array<SidebarItem> = [
        {
            ariaLabel: "Bots",
            key: SidebarTab.Bots,
            label: "Bots",
            icon: RobotIcon,
        },
        {
            ariaLabel: "Portfolio",
            key: SidebarTab.Portfolio,
            label: "Portfolio",
            icon: UserIcon,
        }
    ]
    const tabs2: Array<SidebarItem> = [
        {
            ariaLabel: "Docs",
            key: "docs",
            label: "Docs",
            icon: BookIcon,
        },
        {
            ariaLabel: "Support",
            key: "support",
            label: "Support",
            icon: LifebuoyIcon,
        }
    ]
    return (
        <KaniModal 
            size="sm" 
            isOpen={isOpen} 
            onOpenChange={onOpenChange}
        >
            <KaniModalContent>
                <KaniModalHeader
                    title="Menu"
                />
                <KaniModalBody>
                    <KaniListbox 
                        aria-label="Main Navigation"
                        selectedKeys={[sidebarTab]} 
                        onSelectionChange={(value) => 
                        {
                            if (value === "all") {
                                return
                            }
                            const values = Array.from(value)
                            dispatch(setSidebarTab(values[0] as SidebarTab))
                        }
                        }
                    >
                        {tabs1.map((tab) => (
                            <KaniListboxItem aria-label={tab.ariaLabel} key={tab.key} startContent={<tab.icon />}>{tab.label}</KaniListboxItem>
                        ))}
                    </KaniListbox>
                    <Spacer y={4}/>
                    <KaniDivider/>
                    <Spacer y={4}/>
                    <KaniListbox aria-label="Secondary Navigation">
                        {tabs2.map((tab) => (
                            <KaniListboxItem aria-label={tab.ariaLabel} key={tab.key} startContent={<tab.icon />} endContent={<LinkIcon />}>{tab.label}</KaniListboxItem>
                        ))}
                    </KaniListbox>  
                    <Spacer y={4}/>
                    <KaniDivider/>
                    <Spacer y={4}/>
                    <SwitchThemeButton />
                </KaniModalBody>
            </KaniModalContent>
        </KaniModal>
    )
}
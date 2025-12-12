import { KaniListbox, KaniListboxItem, KaniDivider } from "@/components/atomic"
import React from "react"
import { BookIcon, LifebuoyIcon, RobotIcon, UserIcon } from "@phosphor-icons/react"
import { 
    useAppSelector, 
    SidebarTab, 
    setSidebarTab, 
    useAppDispatch 
} from "@/redux"
import { Spacer, LinkIcon } from "@heroui/react"

export interface SidebarItem {
    ariaLabel: string
    key: SidebarTab | string
    label: string
    icon: React.ElementType
}

export const Sidebar = () => {
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
        <div className="hidden md:block p-6 w-[300px] min-w-[300px] border-r border-divider">
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
        </div>
    )
}
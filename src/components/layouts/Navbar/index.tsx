import { 
    KaniNavbar, 
    KaniNavbarBrand, 
    KaniNavbarContent, 
    KaniNavbarItem
} from "../../atomic"
import React from "react"
import { KaniSignInButton } from "./KaniSignInButton"
import { KaniUserDropdown } from "./KaniUserDropdown"
import { SwitchThemeButton } from "../../reuseable"
import { MobileMenuButton } from "./MobileMenuButton"
import { usePrivy } from "@privy-io/react-auth"
import Image from "next/image"

export const Navbar = () => {
    const { user } = usePrivy()
    return (
        <KaniNavbar isBordered>
            <KaniNavbarBrand>
                <div className="flex items-center gap-1">
                    <Image src="/logo.svg" alt="KANI" width={40} height={40} />
                    <div className="text-2xl font-semibold text-primary">KANI</div>
                </div>
            </KaniNavbarBrand>
            <KaniNavbarContent justify="end">
                <KaniNavbarItem className="hidden md:block">
                    <SwitchThemeButton />
                </KaniNavbarItem>
                <KaniNavbarItem>
                    {
                        (() => {
                            if (!user) {
                                return <KaniSignInButton />
                            }    
                            return <KaniUserDropdown />
                        })()
                    }
                </KaniNavbarItem>
                <KaniNavbarItem className="sm:hidden">
                    <MobileMenuButton />
                </KaniNavbarItem>
            </KaniNavbarContent>
        </KaniNavbar>
    )
}
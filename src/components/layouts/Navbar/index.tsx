import { 
    KaniNavbar, 
    KaniNavbarBrand, 
    KaniNavbarContent, 
    KaniNavbarItem
} from "../../atomic"
import React from "react"
import { KaniSignInButton } from "./KaniSignInButton"
import { KaniUserDropdown } from "./KaniUserDropdown"
import { useAppSelector } from "@/redux"
import { SwitchThemeButton } from "../../reuseable"
import { MobileMenuButton } from "./MobileMenuButton"

export const Navbar = () => {
    const user = useAppSelector((state) => state.session.user)
    return (
        <KaniNavbar isBordered>
            <KaniNavbarBrand>
                <p className="font-bold text-inherit">KANI</p>
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
import { 
    KaniNavbar, 
    KaniNavbarBrand, 
    KaniNavbarContent, 
    KaniNavbarItem
} from "../../atomic"
import { Link } from "@heroui/react"
import React from "react"
import { usePrivy } from "@privy-io/react-auth"
import { KaniSignInButton } from "./KaniSignInButton"
import { KaniUserDropdown } from "./KaniUserDropdown"
import { KaniLoadingButton } from "./KaniLoadingButton"

export const Navbar = () => {
    const { authenticated, ready } = usePrivy()
    return (
        <KaniNavbar isBordered>
            <KaniNavbarBrand>
                <p className="font-bold text-inherit">KANI</p>
            </KaniNavbarBrand>
            <KaniNavbarContent className="hidden sm:flex gap-4" justify="center">
                <KaniNavbarItem>
                    <Link color="foreground" href="#">
            Features
                    </Link>
                </KaniNavbarItem>
                <KaniNavbarItem isActive>
                    <Link aria-current="page" href="#">
            Customers
                    </Link>
                </KaniNavbarItem>
                <KaniNavbarItem>
                    <Link color="foreground" href="#">
            Integrations
                    </Link>
                </KaniNavbarItem>
            </KaniNavbarContent>
            <KaniNavbarContent justify="end">
                <KaniNavbarItem>
                    {
                        (() => {
                            if (!ready) {
                                return <KaniLoadingButton />
                            }
                            if (authenticated) {
                                return <KaniUserDropdown />
                            }
                            return <KaniSignInButton />
                        })()
                    }
                </KaniNavbarItem>
                <KaniNavbarItem>
                </KaniNavbarItem>
            </KaniNavbarContent>
        </KaniNavbar>
    )
}
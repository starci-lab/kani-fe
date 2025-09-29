import { 
    KaniButton, 
    KaniNavbar, 
    KaniNavbarBrand, 
    KaniNavbarContent, 
    KaniNavbarItem
} from "../../atomic"
import { Link } from "@heroui/react"
import React from "react"
import { useAppSelector } from "@/redux"
import { useRouter } from "next/navigation"

export const Navbar = () => {
    const apiAuthRedirect = useAppSelector((state) => state.api.apiAuthRedirect)
    const router = useRouter()
    return (
        <KaniNavbar>
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
                <KaniNavbarItem className="hidden lg:flex">
                    <KaniButton onPress={() => {
                        apiAuthRedirect.redirectGoogle(router)
                    }}>Login</KaniButton>
                </KaniNavbarItem>
                <KaniNavbarItem>
                </KaniNavbarItem>
            </KaniNavbarContent>
        </KaniNavbar>
    )
}
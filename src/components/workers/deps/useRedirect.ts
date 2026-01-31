import { useLayoutEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { paths } from "@/resources/path"
import { usePrivy } from "@privy-io/react-auth"

export const useRedirect = () => {
    const pathname = usePathname()
    const router = useRouter()
    const { authenticated } = usePrivy()
    useLayoutEffect(() => {
        if (!authenticated) {
            if (pathname !== paths().base()) {
                router.push(paths().base())
                return
            }
        }
        if (authenticated) {
            if (pathname === paths().base()) {
                router.push(paths().bots().base())
                return
            }
        }
    }, [pathname, router, authenticated])
}
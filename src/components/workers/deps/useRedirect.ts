import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { paths } from "@/modules/path"

export const useRedirect = () => {
    const pathname = usePathname()
    const router = useRouter()
    useEffect(() => {
        if (pathname === paths().base()) {
            router.push(paths().bots().base())
            return
        }
    }, [pathname, router])
}
import { paths } from "@/resources/path"
import { setBotId, setSocketLiquidityPoolIds, useAppDispatch, useAppSelector } from "@/redux"
import { useParams, usePathname } from "next/navigation"
import { useEffect, useLayoutEffect } from "react"

export const useBot = () => {
    const { id } = useParams()
    const bot = useAppSelector((state) => state.bot.bot)
    const pathname = usePathname()
    const dispatch = useAppDispatch()
    useLayoutEffect(() => {
        const base = paths().bots().base()
        const regex = new RegExp(`^${base}/[^/]+$`)

        if (regex.test(pathname)) {
            const _id = id as string
            dispatch(setBotId(_id))
        }
    }, [id, pathname, dispatch])

    useEffect(() => {
        if (bot && bot.activePosition?.liquidityPool) {
            dispatch(
                setSocketLiquidityPoolIds([bot.activePosition?.liquidityPool ?? ""])
            )
        }
    }, [bot, dispatch])
    
}
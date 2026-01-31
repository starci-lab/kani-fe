import { paths } from "@/resources/path"
import { BotDisplayMode, BotTab, setBotId, setBotTab, setDisplayMode, setSocketLiquidityPoolIds, useAppDispatch, useAppSelector } from "@/redux"
import { useParams, usePathname, useSearchParams } from "next/navigation"
import { useEffect, useLayoutEffect } from "react"
import { usePrivy } from "@privy-io/react-auth"

export const useBot = () => {
    const { id } = useParams()
    const bot = useAppSelector((state) => state.bot.bot)
    const pathname = usePathname()
    const dispatch = useAppDispatch()
    const searchParams = useSearchParams()
    const { authenticated } = usePrivy()
    useLayoutEffect(() => {
        if (!authenticated) {
            return
        }
        const base = paths().bots().base().split("?")[0]
        if (pathname.startsWith(base)) {
            const _id = id as string
            if (!_id) {
                const displayMode = searchParams.get("displayMode") as BotDisplayMode
                if (displayMode !== BotDisplayMode.Grid) {
                    dispatch(setDisplayMode(displayMode))
                }
                return
            }
            dispatch(setBotId(_id))
            const tab = searchParams.get("tab") as BotTab
            if (tab !== BotTab.Overview) {
                dispatch(setBotTab(tab))
            }
        }
    }, [id, pathname, dispatch, authenticated])

    useEffect(() => {
        if (bot && bot.activePosition?.liquidityPool) {
            dispatch(
                setSocketLiquidityPoolIds([bot.activePosition?.liquidityPool ?? ""])
            )
        }
    }, [bot, dispatch])
    
}
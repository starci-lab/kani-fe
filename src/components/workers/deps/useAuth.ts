import { getLocalStorageItem, LocalStorageKey } from "@/modules/storages"
import { useEffect } from "react"
import { useAppDispatch } from "@/redux"
import { setAccessToken } from "@/redux/slices"

export const useAuth = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        const accessToken = getLocalStorageItem<string>(
            LocalStorageKey.AccessToken
        )
        if (!accessToken) {
            return
        }
        dispatch(setAccessToken(accessToken))
    }, [])
}
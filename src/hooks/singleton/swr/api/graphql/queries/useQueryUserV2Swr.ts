import { queryUserV2 } from "@/modules/api"
import { SwrContext } from "../../../SwrContext"
import { use } from "react"
import { useAppDispatch, setUser } from "@/redux"
import useSWR from "swr"
import { usePrivy } from "@privy-io/react-auth"

export const useQueryUserV2SwrCore = () => {
    const dispatch = useAppDispatch()
    const isDisabled = false
    const { getAccessToken, authenticated } = usePrivy()
    const swr = useSWR(
        isDisabled ? null : (authenticated ? ["QUERY_USER_V2_SWR", authenticated] : null),
        async () => {
            const accessToken = await getAccessToken()
            if (!accessToken) {
                throw new Error("Access token is required")
            }
            const data = await queryUserV2({
                token: accessToken,
            })
            const user = data.data?.userV2
            if (!user) {
                throw new Error("User not found")
            }
            if (!user.data) {
                throw new Error("User data not found")
            }
            dispatch(setUser(user.data))
            return data
        }
    )
    return swr
}

export const useQueryUserV2Swr = () => {
    const { queryUserV2Swr } = use(SwrContext)!
    return queryUserV2Swr
}

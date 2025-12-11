import { queryUser } from "@/modules/api"
import { SwrContext } from "../../../SwrContext"
import { useContext } from "react"
import { useAppDispatch, setUser } from "@/redux"
import { usePrivy } from "@privy-io/react-auth"
import useSWR from "swr"

export const useQueryUserSwrCore = () => {
    const { authenticated, getAccessToken } = usePrivy()
    const dispatch = useAppDispatch()
    const swr = useSWR(
        authenticated ? "QUERY_USER_SWR_MUTATION" : null,
        async () => {
            const token = await getAccessToken()
            if (!token) {
                throw new Error("No access token found")
            }
            const data = await queryUser({
                token,
            })
            const user = data.data?.user
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

export const useQueryUserSwr = () => {
    const { queryUser } = useContext(SwrContext)!
    return queryUser
}

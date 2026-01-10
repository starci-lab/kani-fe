import { queryUser } from "@/modules/api"
import { SwrContext } from "../../../SwrContext"
import { use } from "react"
import { useAppDispatch, setUser, useAppSelector } from "@/redux"
import useSWR from "swr"

export const useQueryUserSwrCore = () => {
    const dispatch = useAppDispatch()
    const isDisabled = true
    const accessToken = useAppSelector((state) => state.session.accessToken)
    const swr = useSWR(
        isDisabled ? null : (accessToken ? ["QUERY_USER_SWR", accessToken] : null),
        async () => {
            const data = await queryUser({
                token: accessToken,
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
    const { queryUserSwr } = use(SwrContext)!
    return queryUserSwr
}

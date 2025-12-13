import { queryUser } from "@/modules/api"
import { SwrContext } from "../../../SwrContext"
import { useContext } from "react"
import { useAppDispatch, setUser, useAppSelector } from "@/redux"
import useSWR from "swr"

export const useQueryUserSwrCore = () => {
    const dispatch = useAppDispatch()
    const accessToken = useAppSelector((state) => state.session.accessToken)
    const swr = useSWR(
        accessToken ? "QUERY_USER_SWR_MUTATION" : null,
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
    const { queryUser } = useContext(SwrContext)!
    return queryUser
}

import { queryUser } from "@/modules/api"
import useSWRMutation from "swr/mutation"
import { SwrContext } from "../../../SwrContext"
import { useContext } from "react"
import { useAppDispatch, setUser } from "@/redux"
import { usePrivy } from "@privy-io/react-auth"

export const useQueryUserSwrMutationCore = () => {
    const { authenticated } = usePrivy()
    const dispatch = useAppDispatch()
    const swrMutation = useSWRMutation(
        authenticated ? "QUERY_USER_SWR_MUTATION" : null,
        async () => {
            const data = await queryUser({})
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
    return swrMutation
}

export const useQueryUserWithoutRetrySwrMutationCore = () => {
    const dispatch = useAppDispatch()
    const swrMutation = useSWRMutation(
        ["QUERY_USER_WITHOUT_RETRY_SWR_MUTATION"],
        async () => {
            const data = await queryUser({})
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
    return swrMutation
}

export const useQueryUserSwrMutation = () => {
    const { queryUserSwrMutation } = useContext(SwrContext)!
    return queryUserSwrMutation
}

export const useQueryUserWithoutRetrySwrMutation = () => {
    const { queryUserWithoutRetrySwrMutation } = useContext(SwrContext)!
    return queryUserWithoutRetrySwrMutation
}
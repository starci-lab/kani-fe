import { queryUser } from "@/modules/api"
import useSWRMutation from "swr/mutation"
import { SwrContext } from "../../../SwrContext"
import { useContext } from "react"
import { useAppDispatch, setUser } from "@/redux"

export const useQueryUserSwrMutationCore = () => {
    const dispatch = useAppDispatch()
    const swrMutation = useSWRMutation(
        ["QUERY_USER_SWR_MUTATION"],
        async () => {
            const data = await queryUser({})
            const user = data.data?.user
            if (!user) {
                throw new Error("User not found")
            }
            dispatch(setUser(user))
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
            const data = await queryUser({}, true)
            const user = data.data?.user
            if (!user) {
                throw new Error("User not found")
            }
            dispatch(setUser(user))
            return data
        }
    )
    return swrMutation
}

export const useQueryUserSwrMutation = () => {
    const { queryUserMutation } = useContext(SwrContext)!
    return queryUserMutation
}

export const useQueryUserWithoutRetrySwrMutation = () => {
    const { queryUserWithoutRetryMutation } = useContext(SwrContext)!
    return queryUserWithoutRetryMutation
}

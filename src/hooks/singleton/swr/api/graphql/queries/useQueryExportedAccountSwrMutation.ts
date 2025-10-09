import { queryExportedAccount, GraphQLHeadersKey } from "@/modules/api"
import { SwrContext } from "../../../SwrContext"
import { useContext } from "react"
import { useAppSelector } from "@/redux"
import useSWRMutation from "swr/mutation"

export const useQueryExportedAccountSwrMutationCore = () => {
    const id = useAppSelector((state) => state.params.dashboard.liquidityProvision.id)
    // if id and totpVerified are not null, then return the id
    const swrMutation = useSWRMutation(
        ["QUERY_EXPORTED_ACCOUNT_SWR_MUTATION", id],
        async (
            _,
            {
                arg
            }: {
            arg: string
        }) => {
            if (!id) {
                throw new Error("Id is required")
            }
            return await queryExportedAccount({
                request: {
                    id,
                },
                headers: {
                    [GraphQLHeadersKey.TOTP]: arg,
                },
            })
        }
    )
    return swrMutation
}

export const useQueryExportedAccountSwrMutation = () => {
    const { queryExportedAccount } = useContext(SwrContext)!
    return queryExportedAccount
}

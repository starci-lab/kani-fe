"use client"
import { useQueryUserWithoutRetrySwrMutation } from "@/hooks/singleton"
import { useAppSelector } from "@/redux"
import { SearchParamKey } from "@/modules/query"
import { SessionStorage, SessionStorageKey } from "@/modules/storages"
import { useSearchParams } from "next/navigation"
import React, { useEffect } from "react"
import { QRCode } from "@/components"

const Page = () => {
    const searchParams = useSearchParams()
    const queryUserMutation = useQueryUserWithoutRetrySwrMutation()
    const user = useAppSelector(state => state.session.user)
    useEffect(() => {
        const handleEffect = async () => {
        // get access token from search params
            const accessToken = searchParams.get(SearchParamKey.AccessToken)
            // store access token in session storage
            new SessionStorage().setItem(SessionStorageKey.AccessToken, accessToken)
            // call query user mutation
            await queryUserMutation.trigger()
        }
        handleEffect()
    }, [searchParams])

    return <div><QRCode /></div>
}

export default Page
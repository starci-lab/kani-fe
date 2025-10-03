"use client"
import { useQueryUserWithoutRetrySwrMutation } from "@/hooks/singleton"
import { SearchParamKey } from "@/modules/query"
import { SessionStorage, SessionStorageKey } from "@/modules/storages"
import { useSearchParams } from "next/navigation"
import React, { useEffect } from "react"
import { EnableTOTPCard } from "@/components"
import { Spacer } from "@heroui/react"

const Page = () => {
    const searchParams = useSearchParams()
    const queryUserMutation = useQueryUserWithoutRetrySwrMutation()
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

    return <div>  
        <Spacer y={10} />
        <div className="flex justify-center">
            <EnableTOTPCard />
        </div>
    </div>
}

export default Page
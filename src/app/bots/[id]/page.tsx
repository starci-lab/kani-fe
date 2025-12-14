"use client"
import React, { useLayoutEffect } from "react"
import { useParams } from "next/navigation"
import { setBotId, useAppDispatch } from "@/redux"
import { Bot } from "@/components"

const Page = () => {
    // get the bot id from the url
    const { id } = useParams()
    const dispatch = useAppDispatch()
    // set the bot id in the redux store
    useLayoutEffect(() => {
        dispatch(setBotId(id as string))
    }, [id])

    return (
        <div>
            <Bot />
        </div>
    )
}

export default Page
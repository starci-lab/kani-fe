"use client"
import React from "react"
import { useParams } from "next/navigation"
import { LiquidityProvisionBotPage } from "@/components"
import { Spacer } from "@heroui/react"

const Page = () => {
    const { id } = useParams()
    return <div className="mx-auto flex flex-col items-center w-full">
        <Spacer y={6} />
        <LiquidityProvisionBotPage id={id as string} />
    </div>
}

export default Page
"use client"
import React from "react"
import { useParams } from "next/navigation"
import { InitializeLiquidityProvisionBotCard } from "@/components/layouts"
import { Spacer } from "@heroui/react"

const Page = () => {
    const { id } = useParams()
    return <div className="mx-auto flex flex-col items-center w-full">
        <Spacer y={6} />
        <InitializeLiquidityProvisionBotCard id={id as string} />
    </div>
}

export default Page
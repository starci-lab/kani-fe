"use client"
import React from "react"
import { useParams } from "next/navigation"
import { SetupLiquidityProvisionBotCard } from "@/components/layouts"

const Page = () => {
    const { id } = useParams()
    return <div>
        <SetupLiquidityProvisionBotCard id={id as string} />
    </div>
}

export default Page
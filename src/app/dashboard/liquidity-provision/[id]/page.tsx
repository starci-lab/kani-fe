"use client"
import React from "react"
import { useParams } from "next/navigation"

const Page = () => {
    const { id } = useParams()
    return <div>Liquidity Provision</div>
}

export default Page
import React, { useEffect, useState } from "react"
import { dayjs } from "@/modules/dayjs"

export interface TimeCounterProps {
    createdAt?: string | Date
}
export const TimeCounter = ({
    createdAt,
}: TimeCounterProps) => {
    const [now, setNow] = useState(Date.now())

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(Date.now())
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    if (!createdAt) return null

    const diff = now - dayjs(createdAt).valueOf()

    const hours = Math.floor(diff / 1000 / 60 / 60)
    const minutes = Math.floor((diff / 1000 / 60) % 60)
    const seconds = Math.floor((diff / 1000) % 60)

    const format = (n: number) => n.toString().padStart(2, "0")

    return (
        <div className="text-sm">
            {format(hours)}:{format(minutes)}:{format(seconds)}
        </div>
    )
}
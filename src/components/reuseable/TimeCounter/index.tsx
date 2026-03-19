import React, { useEffect, useState } from "react"
import { dayjs } from "@/modules/dayjs"

export interface TimeCounterProps {
    createdAt?: string | Date
    className?: string
}

export const TimeCounter = ({
    createdAt,
    className,
}: TimeCounterProps) => {
    const [now, setNow] = useState(Date.now())

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(Date.now())
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    if (!createdAt) return null

    const diff = Math.max(0, now - dayjs(createdAt).valueOf())
    const totalSeconds = Math.floor(diff / 1000)

    const days = Math.floor(totalSeconds / 86400)
    const hours = Math.floor((totalSeconds % 86400) / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    const format = (n: number) => n.toString().padStart(2, "0")

    const display = (() => {
        if (days > 0) {
            return `${days}d ${format(hours)}:${format(minutes)}`
        }

        if (hours > 0) {
            return `${format(hours)}:${format(minutes)}:${format(seconds)}`
        }

        return `${format(minutes)}:${format(seconds)}`
    })()

    return (
        <div className={className ?? "text-sm"}>
            {display}
        </div>
    )
}
"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { ArrowClockwiseIcon } from "@phosphor-icons/react"
import { WithClassNames } from "../../types"
import { cn } from "@heroui/react"

export interface RefreshIconProps extends WithClassNames<{
  icon?: string
}> {
  onRefresh?: () => void
}

export const RefreshIcon = ({ className, classNames, onRefresh }: RefreshIconProps) => {
    const [spin, setSpin] = useState(0)
    return (
        <motion.span
            className={cn("inline-block cursor-pointer", className)}
            animate={{ rotate: spin * 360 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            onClick={() => {
                setSpin((v) => v + 1)
                onRefresh?.()
            }}
        >
            <ArrowClockwiseIcon className={cn("w-5 h-5", classNames?.icon)} />
        </motion.span>
    )
}
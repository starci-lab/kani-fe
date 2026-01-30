"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CopyIcon, CheckIcon } from "@phosphor-icons/react"
import { WithClassNames } from "../../types"

export interface SnippetIconProps extends WithClassNames<{
  copyIcon?: string
  checkIcon?: string
}> {
  copyString: string
}

export const SnippetIcon = ({ copyString, classNames }: SnippetIconProps) => {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        await navigator.clipboard.writeText(copyString)
        setCopied(true)
        setTimeout(() => setCopied(false), 350)
    }

    return (
        <motion.div
            onClick={handleCopy}
            className="cursor-pointer"
            whileTap={{ scale: 0.9 }}
        >
            <AnimatePresence mode="wait">
                {copied ? (
                    <motion.span
                        key="check"
                        initial={{ scale: 0.85, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.85, opacity: 0 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                    >
                        <CheckIcon className={classNames?.checkIcon} />
                    </motion.span>
                ) : (
                    <motion.span
                        key="copy"
                        initial={{ scale: 0.85, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.85, opacity: 0 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                    >
                        <CopyIcon className={classNames?.copyIcon} />
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.div>
    )
}
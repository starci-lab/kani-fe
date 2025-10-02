import React, { useState } from "react"
import { CheckIcon, CopyIcon } from "@phosphor-icons/react"
import { motion, AnimatePresence } from "framer-motion"
import { KaniLink } from ".."

export interface KaniSnippetProps {
    value: string
    copyDelay?: number
    classNames?: {
        icon?: string
    }
}

export const KaniSnippet: React.FC<KaniSnippetProps> = ({
    value,
    copyDelay = 1400,
    classNames = {
        icon: ""
    }
}) => {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(value)
            setCopied(true)
            setTimeout(() => setCopied(false), copyDelay)
        } catch (error) {
            console.error("Failed to copy:", error)
        }
    }

    return (
        <KaniLink color="foreground" onClick={handleCopy}>
            <AnimatePresence mode="wait">
                {copied ? (
                    <motion.span
                        key="check"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <CheckIcon className={classNames.icon} />
                    </motion.span>
                ) : (
                    <motion.span
                        key="copy"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <CopyIcon className={classNames.icon} />
                    </motion.span>
                )}
            </AnimatePresence>
        </KaniLink>
    )
}
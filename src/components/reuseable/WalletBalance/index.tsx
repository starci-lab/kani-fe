import { KaniDivider, KaniLink } from "@/components/atomic"
import { WalletIcon } from "@phosphor-icons/react"
import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import Decimal from "decimal.js"
import { round } from "@/modules/utils"
export type WalletBalanceAction = "25%" | "50%" | "75%" | "Max"

export interface WalletBalanceProps {
  amount: Decimal
  onAction: (action: WalletBalanceAction) => void
  showBalance: boolean
}

export const WalletBalance = (
    {
        amount,
        onAction,
        showBalance,
    }: WalletBalanceProps) => {
    return (
        <div className="relative overflow-hidden h-6">
            <AnimatePresence mode="wait">
                {showBalance ? (
                    <motion.div
                        key="balance"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 20, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="flex items-center gap-2"
                    >
                        <WalletIcon className="w-5 h-5 text-primary" />
                        <div className="text-sm text-primary">{round(amount)}</div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="actions"
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -20, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="flex items-center gap-2"
                    >
                        <KaniLink className="text-sm" onPress={() => onAction("25%")}>25%</KaniLink>
                        <KaniDivider className="h-5" orientation="vertical" />
                        <KaniLink className="text-sm" onPress={() => onAction("50%")}>50%</KaniLink>
                        <KaniDivider className="h-5" orientation="vertical" />
                        <KaniLink className="text-sm" onPress={() => onAction("75%")}>75%</KaniLink>
                        <KaniDivider className="h-5" orientation="vertical" />
                        <KaniLink className="text-sm" onPress={() => onAction("Max")}>Max</KaniLink>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
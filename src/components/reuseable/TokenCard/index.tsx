import React from "react"
import { TokenSchema } from "@/modules/types"
import { KaniAvatar } from "../../atomic"
import { XsSnippet } from "../XsSnippet"
import { motion } from "framer-motion"
import { Spacer, cn } from "@heroui/react"

export interface TokenCardProps {
    token: TokenSchema
    isSelected?: boolean
    price?: number
    onSelect?: () => void
}

export const TokenCard = ({ token, price, isSelected, onSelect }: TokenCardProps) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className={cn("w-full h-full cursor-pointer", 
                "rounded-xl transition-colors duration-300",
                isSelected ? "bg-primary/20" : "hover:bg-primary/10"
            )}
            onClick={onSelect}
        >
            <div className="flex justify-between items-center p-3">
                <div>
                    <div className="flex items-center gap-2">
                        <KaniAvatar src={token.iconUrl} className="w-10 h-10" radius="full" />
                        <div>
                            <div className="text-sm font-medium">{token.name}</div>
                            <div className="text-xs text-foreground-500">{token.symbol}</div>
                        </div>
                    </div>
                    <Spacer y={2} />
                    <XsSnippet text={token.tokenAddress ?? ""} />
                </div>
                <div>
                    {`$${price ?? 0}`}
                </div>
            </div>
        </motion.div>
    )
}
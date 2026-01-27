import { motion } from "framer-motion"
import { CaretUpIcon } from "@phosphor-icons/react"
import React from "react"
import { WithClassNames } from "@/components/types"

export interface CaretRotateIconProps extends WithClassNames<{
    icon?: string
}> {
    isUp: boolean
}
export const CaretRotateIcon = ({
    classNames,
    isUp,
    className,
}: CaretRotateIconProps) => {
    return (
        <motion.div
            animate={{ rotate: isUp ? 180 : 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className={className}
        >
            <CaretUpIcon className={classNames?.icon} />
        </motion.div>
    )
}
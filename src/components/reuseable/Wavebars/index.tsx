"use client"

import { motion } from "framer-motion"
import React from "react"

const scales = [
    [0.5, 0.7, 0.5], // top
    [0.7, 0.95, 0.7], // left
    [0.9, 1.2, 0.9],  // center
    [0.7, 0.95, 0.7], // right
    [0.5, 0.7, 0.5], // bottom
]
export const WaveBars = () => {
    return (
        <div className="px-3 py-[6px] bg-content2 rounded-medium">
            <div className="flex items-center gap-1 h-5">
                {scales.map((scale, i) => (
                    <motion.span
                        key={i}
                        className="w-1 h-full rounded-full"
                        style={{
                            transformOrigin: "50% 50%",
                            background:
              "linear-gradient(180deg, hsl(var(--heroui-primary)), hsl(var(--heroui-secondary)))",
                            backgroundSize: "200% 200%",
                        }}
                        animate={{
                            scaleY: scale,
                            backgroundPosition: ["0% 0%", "0% 100%", "0% 0%"],
                        }}
                        transition={{
                            duration: 1.6,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i === 1 ? 0 : 0.12, // center đi trước
                        }}
                    />
                ))}
            </div>
        </div>
    )
}
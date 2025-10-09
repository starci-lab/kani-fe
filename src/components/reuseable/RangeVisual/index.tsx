import React from "react"

export interface RangeVisualProps {
    min: number
    max: number
    value: number
}
export const RangeVisual = ({ min, max, value }: RangeVisualProps) => {
    const percent = ((value - min) / (max - min)) * 100
    return (
        <div className="relative flex justify-center items-center w-full">
            {/* Outer bar */}
            <div className="h-2 bg-content2 w-full" style={{
                maskImage:
        "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                WebkitMaskImage:
        "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            }}/>
      
            {/* Inner bar (centered, 60%) */}
            <div
                className="absolute h-2 bg-gradient-to-r from-primary to-secondary w-[60%] left-1/2 -translate-x-1/2"
            />

            {/* Thumb */}
            <div className="absolute top-1/2 -translate-y-1/2 w-1 h-4 bg-foreground rounded-full" style={{ left: `${percent}%` }} />
        </div>
    )
}
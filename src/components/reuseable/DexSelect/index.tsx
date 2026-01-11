import React from "react"
import { DexSchema } from "@/modules/types"

export interface DexSelectProps {
    dexes: Array<DexSchema>  
    value: string
    onChange: (value: string) => void
}
export const DexSelect = () => {
    return (
        <div>
            <div>DexSelect</div>
        </div>
    )
}
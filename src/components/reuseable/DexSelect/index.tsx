import React from "react"
import { DexSchema } from "@/modules/types"
import { KaniSelect, KaniSelectItem, KaniImage } from "../../atomic"
import { SharedSelection } from "@heroui/react"
export interface DexSelectProps {
    dexes: Array<DexSchema>  
    selectedKeys: SharedSelection
    onSelectionChange: (keys: SharedSelection) => void
}
export const DexSelect = ({ dexes, selectedKeys, onSelectionChange }: DexSelectProps) => {
    return (
        <KaniSelect 
            selectionMode="multiple"
            selectedKeys={selectedKeys}
            onSelectionChange={onSelectionChange}
            className="w-[150px]"
        >
            {dexes.map((dex) => (
                <KaniSelectItem key={dex.displayId} startContent={<KaniImage src={dex.iconUrl} radius="full" className="w-5 h-5" />}>
                    {dex.name}
                </KaniSelectItem>
            ))}
        </KaniSelect>
    )
}
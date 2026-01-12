import { SortAscendingIcon, SortDescendingIcon } from "@phosphor-icons/react"
import { KaniButton, KaniDivider, KaniDropdown, KaniDropdownItem, KaniDropdownMenu, KaniDropdownTrigger } from "@/components/atomic"
import React from "react"
import { LiquidityPools2SortBy } from "@/modules/api"

export interface SortByDropdownProps {
    sortBy: LiquidityPools2SortBy
    asc: boolean
    onSortByChange: (sortBy: LiquidityPools2SortBy) => void
    onAscChange: (asc: boolean) => void
}
export const SortByDropdown = ({ sortBy, asc, onSortByChange, onAscChange }: SortByDropdownProps) => {
    const items = [
        {
            key: LiquidityPools2SortBy.Fees,
            label: "Fees",
        },
        {
            key: LiquidityPools2SortBy.Liquidity,
            label: "Liquidity",
        },
        {
            key: LiquidityPools2SortBy.Volume,
            label: "Volume",
        },
        {
            key: LiquidityPools2SortBy.Apr,
            label: "APR",
        },
    ]
    return (
        <div className="flex items-center">
            <KaniDropdown aria-label="Sort By">
                <KaniDropdownTrigger>
                    <KaniButton variant="flat" className="rounded-r-none">
                        {items.find(item => item.key === sortBy)?.label}
                    </KaniButton>
                </KaniDropdownTrigger>
                <KaniDropdownMenu 
                    aria-label="Sort By"
                    selectionMode="single"
                    selectedKeys={[sortBy]}
                    onSelectionChange={(value) => {
                        if (value === "all") {
                            return
                        }
                        const selectedKeys = Array.from(value)
                        onSortByChange(selectedKeys[0] as LiquidityPools2SortBy)
                    }}
                >
                    {items.map((item) => (
                        <KaniDropdownItem key={item.key}>
                            {item.label}
                        </KaniDropdownItem>
                    ))}
                </KaniDropdownMenu>
            </KaniDropdown>
            <KaniDivider orientation="vertical" className="h-10" />
            <KaniButton variant="flat" isIconOnly className="rounded-l-none" onPress={() => onAscChange(!asc)}>
                {asc ? <SortAscendingIcon className="w-5 h-5" /> : <SortDescendingIcon className="w-5 h-5" />}
            </KaniButton>
        </div>
    )
}
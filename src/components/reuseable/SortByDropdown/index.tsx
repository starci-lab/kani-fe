import { SortAscendingIcon, SortDescendingIcon } from "@phosphor-icons/react"
import { KaniButton, KaniDivider, KaniDropdown, KaniDropdownItem, KaniDropdownMenu, KaniDropdownTrigger } from "@/components/atomic"
import React from "react"
import { LiquidityPoolsSortBy } from "@/modules/api"

export interface SortByDropdownProps {
    sortBy: LiquidityPoolsSortBy
    asc: boolean
    onSortByChange: (sortBy: LiquidityPoolsSortBy) => void
    onAscChange: (asc: boolean) => void
}
export const SortByDropdown = ({ sortBy, asc, onSortByChange, onAscChange }: SortByDropdownProps) => {
    const items = [
        {
            key: LiquidityPoolsSortBy.Fees,
            label: "Fees",
        },
        {
            key: LiquidityPoolsSortBy.Liquidity,
            label: "Liquidity",
        },
        {
            key: LiquidityPoolsSortBy.Volume,
            label: "Volume",
        },
        {
            key: LiquidityPoolsSortBy.Apr,
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
                        onSortByChange(selectedKeys[0] as LiquidityPoolsSortBy)
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
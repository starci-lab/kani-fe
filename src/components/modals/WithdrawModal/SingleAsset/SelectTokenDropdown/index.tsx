import { useQueryBalancesV2Swr, useSingleAssetWithdrawFormik } from "@/hooks/singleton"
import { 
    KaniButton, 
    KaniDropdown, 
    KaniDropdownItem, 
    KaniDropdownMenu, 
    KaniDropdownTrigger,
    KaniImage
} from "../../../../atomic"
import React, { useMemo } from "react"
import { TokenId } from "@/modules/types"
import { useAppSelector } from "@/redux"
import { CaretDownIcon } from "@phosphor-icons/react"

export const SelectTokenDropdown = () => {
    const formik = useSingleAssetWithdrawFormik()
    const tokens = useAppSelector((state) => state.static.tokens)
    const swr = useQueryBalancesV2Swr()
    const balanceTokens = useMemo(() => swr.data?.data?.balancesV2.data?.map((balance) => tokens.find((token) => token.id === balance.id)).filter((token) => token !== undefined) || [], [swr.data])
    const selectedToken = useMemo(() => balanceTokens.find((token) => token.id === formik.values.tokenId), [balanceTokens, formik.values.tokenId])
    return (
        <KaniDropdown>
            <KaniDropdownTrigger>
                <KaniButton className="justify-start h-12 px-2" variant="flat" endContent={<CaretDownIcon className="w-4 h-4 min-w-4 min-h-4" />}>
                    <KaniImage src={selectedToken?.iconUrl ?? ""} className="w-8 h-8 min-w-8 min-h-8" radius="full"/>
                    <div className="flex flex-col">
                        <div className="text-sm">{selectedToken?.name ?? ""}</div>
                        <div className="text-xs text-foreground-500">{selectedToken?.symbol ?? ""}</div>
                    </div>
                </KaniButton>
            </KaniDropdownTrigger>
            <KaniDropdownMenu
                selectionMode="single"
                selectedKeys={[formik.values.tokenId ?? ""]}
                onSelectionChange={async (value) => {
                    const selectedKeys = Array.from(value)
                    formik.setFieldValue("tokenId", selectedKeys[0] as TokenId)
                }}
            >
                {balanceTokens.map((token) => (
                    <KaniDropdownItem key={token.id}>
                        <div className="flex items-center gap-2 max-w-[300px]">
                            <div>
                                <div className="flex items-center gap-2">
                                    <KaniImage src={token.iconUrl} className="w-5 h-5" />
                                    {token.name}
                                </div>
                            </div>
                        </div>
                    </KaniDropdownItem>
                ))}
            </KaniDropdownMenu>
        </KaniDropdown>
    )
}
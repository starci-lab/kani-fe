import {
    KaniButton,
    KaniDropdown,
    KaniDropdownTrigger,
    KaniDropdownMenu,
    KaniDropdownItem,
    KaniImage,
} from "@/components/atomic"
import { 
    useCreateBotFormik, 
} from "@/hooks/singleton"
import React, { useMemo } from "react"
import { getChainMetadata, supportedChains } from "@/modules"
import { ChainId } from "@/modules/types"
import { Spacer } from "@heroui/react"

export const SelectChainDropdown = () => {
    const formik = useCreateBotFormik()
    const metadata = useMemo(() => {
        return getChainMetadata(formik.values.chainId)
    }, [formik.values.chainId])
    // we return the dropdown
    return (
        <KaniDropdown>
            <KaniDropdownTrigger>
                <KaniButton variant="flat">
                    <KaniImage src={metadata.iconUrl} className="w-5 h-5" />
                    {metadata.name}
                </KaniButton>
            </KaniDropdownTrigger>
            <KaniDropdownMenu
                selectionMode="single"
                selectedKeys={[formik.values.chainId]}
                onSelectionChange={async (value) => {
                    const selectedKeys = Array.from(value)
                    formik.setFieldValue("chainId", selectedKeys[0] as ChainId)
                }}
            >
                {supportedChains().map((chainId) => {
                    const metadata = getChainMetadata(chainId)
                    return (
                        <KaniDropdownItem aria-label={metadata.name} key={chainId}>
                            <div className="flex items-center gap-2 max-w-[300px]">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <KaniImage
                                            src={metadata.iconUrl}
                                            className="w-5 h-5"
                                        />
                                        {metadata.name}
                                    </div>
                                    <Spacer y={2} />
                                    <div className="text-xs text-foreground-500">{metadata.description}</div>
                                </div>
                            </div>
                        </KaniDropdownItem>
                    )
                })}
            </KaniDropdownMenu>
        </KaniDropdown>
    )
}

import {
    KaniButton,
    KaniDropdown,
    KaniDropdownTrigger,
    KaniDropdownMenu,
    KaniDropdownItem,
    KaniImage,
} from "../../../../atomic"
import { 
    useCreateBotFormik, 
} from "@/hooks/singleton"
import React, { useMemo } from "react"
import { getChainConfig, supportedChains } from "@/resources/config"
import { ChainId } from "@/modules/types"
import { Spacer } from "@heroui/react"

export const SelectChainDropdown = () => {
    const formik = useCreateBotFormik()
    const config = useMemo(() => {
        return getChainConfig(formik.values.chainId)
    }, [formik.values.chainId])
    // we return the dropdown
    return (
        <KaniDropdown>
            <KaniDropdownTrigger>
                <KaniButton variant="flat">
                    <KaniImage src={config.iconUrl} className="w-5 h-5" />
                    {config.name}
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
                    const config = getChainConfig(chainId)
                    return (
                        <KaniDropdownItem aria-label={config.name} key={chainId}>
                            <div className="flex items-center gap-2 max-w-[300px]">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <KaniImage
                                            src={config.iconUrl}
                                            className="w-5 h-5"
                                        />
                                        {config.name}
                                    </div>
                                    <Spacer y={2} />
                                    <div className="text-xs text-foreground-500">{config.description}</div>
                                </div>
                            </div>
                        </KaniDropdownItem>
                    )
                })}
            </KaniDropdownMenu>
        </KaniDropdown>
    )
}

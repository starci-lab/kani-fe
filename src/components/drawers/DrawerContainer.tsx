import React from "react"
import { UpdatePoolsDrawer } from "./UpdatePoolsDrawer"
import { SelectTokensDrawer } from "./SelectTokensDrawer"
import { SelectPoolsDrawer } from "./SelectPoolsDrawer"
import { AdvancedConfigurationDrawer } from "./AdvancedConfigurationDrawer"

export const DrawerContainer = () => {
    return (
        <>
            <UpdatePoolsDrawer />
            <SelectTokensDrawer />
            <SelectPoolsDrawer />
            <AdvancedConfigurationDrawer />
        </>
    )
}
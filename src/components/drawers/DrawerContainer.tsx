import React from "react"
import { UpdatePoolsDrawer } from "./UpdatePoolsDrawer"
import { SelectTokensDrawer } from "./SelectTokensDrawer"

export const DrawerContainer = () => {
    return (
        <>
            <UpdatePoolsDrawer />
            <SelectTokensDrawer />
        </>
    )
}
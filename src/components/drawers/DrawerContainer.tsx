import React from "react"
import { UpdatePoolsDrawer } from "./UpdatePoolsDrawer"
import { SelectTokensDrawer } from "./SelectTokensDrawer"
import { SelectPoolsDrawer } from "./SelectPoolsDrawer"
    
export const DrawerContainer = () => {
    return (
        <>
            <UpdatePoolsDrawer />
            <SelectTokensDrawer />
            <SelectPoolsDrawer />
        </>
    )
}
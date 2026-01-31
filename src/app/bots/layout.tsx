"use client"
import React from "react"
import { InnerUILayout } from "../InnerUILayout"

const Layout = ({ children }: React.PropsWithChildren) => {
    return (
        <InnerUILayout>
            {children}
        </InnerUILayout>
    )
}

export default Layout
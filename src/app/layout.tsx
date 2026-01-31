import React from "react"
import { Geist } from "next/font/google"
import "./globals.css"
import { PropsWithChildren } from "react"
import { InnerLayout } from "./InnerLayout"
import { Metadata } from "next"

const font = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
})

export const metadata: Metadata = {
    title: "Kani",
    description: "Kani is an automated liquidity bot that amplifies your capital with maximum leverage through ultra-thin ranges and a smart exit engine blending order-book and oracle/CEX insights for maximum yield.",
}

const Layout = ({
    children,
}: PropsWithChildren) => {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${font.variable} antialiased`}
            >
                <InnerLayout>
                    {children}
                </InnerLayout>
            </body>
        </html>
    )
}

export default Layout

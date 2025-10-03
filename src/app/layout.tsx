import React from "react"
import { Geist } from "next/font/google"
import "./globals.css"
import { PropsWithChildren } from "react"
import { InnerLayout } from "./InnerLayout"
import { NextIntlClientProvider } from "next-intl"

const font = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
})

const Layout = ({
    children,
}: PropsWithChildren) => {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${font.variable} antialiased`}
            >
                <NextIntlClientProvider>
                    <InnerLayout>
                        {children}
                    </InnerLayout>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}

export default Layout

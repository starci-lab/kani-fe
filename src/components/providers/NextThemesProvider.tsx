"use client"

import * as React from "react"
const ThemeProvider = dynamic(
    () => import("next-themes").then((e) => e.ThemeProvider),
    {
        ssr: false,
    }
)

import { type ThemeProviderProps } from "next-themes"
import dynamic from "next/dynamic"

export const NextThemesProvider = ({ children, ...props }: ThemeProviderProps) => {
    return <ThemeProvider {...props}>{children}</ThemeProvider>
}
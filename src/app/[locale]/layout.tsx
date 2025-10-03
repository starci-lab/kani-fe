import { NextIntlClientProvider, hasLocale } from "next-intl"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import { PropsWithChildren } from "react"
import React from "react"

interface LayoutProps extends PropsWithChildren {
  params: Promise<{
    locale: string
  }>
}

const Layout = async ({
    children,
    params,
}: LayoutProps) => {
    const { locale } = await params
    // Validate locale
    if (!hasLocale(routing.locales, locale)) {
        notFound()
    }
    return (
        <NextIntlClientProvider locale={locale}>
            {children}
        </NextIntlClientProvider>
    )
}

export default Layout
"use client"
import React from "react"
import { QRCodeCanvas } from "qrcode.react"

export interface QRCodeProps {
  data?: string
  size?: number
  backgroundColor?: string
}

/**
 * Simple, reliable QR Code component using `qrcode.react`.
 * Automatically renders on canvas with optional center logo.
 */
export const QRCode: React.FC<QRCodeProps> = ({
    data = "https://nomas.app",
    size = 300,
    backgroundColor = "#FFFFFF",
}) => {
    return (
        <div
            className="relative inline-block overflow-hidden shadow p-3 rounded-medium"
        >
            <QRCodeCanvas
                value={data}
                size={size}
                bgColor={backgroundColor}
            />
        </div>
    )
}
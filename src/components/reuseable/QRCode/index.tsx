"use client"
import React from "react"
import { QRCodeCanvas } from "qrcode.react"

export interface QRCodeProps {
  data?: string
  size?: number
  backgroundColor?: string
  icon?: React.ReactNode
}

/**
 * Simple, reliable QR Code component using `qrcode.react`.
 * Automatically renders on canvas with optional center logo.
 */
export const QRCode: React.FC<QRCodeProps> = ({
    data = "https://nomas.app",
    size = 300,
    backgroundColor = "#FFFFFF",
    icon,
}) => {
    return (
        <div
            className="relative inline-block overflow-hidden border border-divider p-3 rounded-medium"
        >
            <QRCodeCanvas
                value={data}
                size={size}
                level="H"
                bgColor={backgroundColor}
            />
            {icon && 
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 bg-white grid place-items-center rounded-full">
                    {icon}
                </div>
            </div>
            }
        </div>
    )
}
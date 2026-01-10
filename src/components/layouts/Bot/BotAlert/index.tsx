import React from "react"
import { KaniAlert } from "@/components"
import { ShieldCheckIcon } from "@phosphor-icons/react"

export const BotAlert = () => {
    return (
        <KaniAlert
            variant="flat"
            icon={<ShieldCheckIcon weight="fill" />}
            classNames={{
                alertIcon: "w-6 h-6",
            }}
            title="Your bot is secured by Privy"
            description={
                <div>
                    <div className="text-xs">Under Privy&apos;s security policies, Kani Bot can only perform specific, permitted actions.
                    </div>
                </div>
            }
        />
    )
}
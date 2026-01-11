import React from "react"
import { KaniAlert } from "@/components"
import { ShieldCheckIcon } from "@phosphor-icons/react"

export const BotAlert = () => {
    return (
        <KaniAlert
            icon={<ShieldCheckIcon weight="fill" />}
            classNames={{
                alertIcon: "w-6 h-6",
            }}
            color="secondary"
            title="Your bot is secured by Privy"
            description={
                <div>
                    <div className="text-xs">
                        Under Privy&apos;s security policies, Kani Bot can only perform specific, permitted actions.
                        These policies are designed to ensure system security, protect user data, and prevent any unauthorized access or malicious operations.
                    </div>
                </div>
            }
        />
    )
}
import { KaniButton, KaniImage } from "../../atomic"
import { Spacer } from "@heroui/react"
import React from "react"
import { useLogin } from "@privy-io/react-auth"
import { motion } from "framer-motion"

export const Onboarding = () => {
    const { login } = useLogin()
    return (
        <div className="min-h-screen flex">
            {/* Left content */}
            <div className="w-1/2 flex items-center justify-center px-16">
                <div className="max-w-md">
                    <motion.h1
                        className="
    text-4xl font-bold leading-normal
    pb-1
    bg-gradient-to-r from-secondary via-primary to-secondary
    bg-[length:200%_200%]
    bg-clip-text text-transparent
  "
                        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                        transition={{ duration: 5, ease: "linear", repeat: Infinity }}
                    >
  Maximize yields with Kani
                    </motion.h1>
                    <Spacer y={4} />
                    <div className="text-foreground-500">
                        Create an account or log in to manage your bots and automatically optimize your strategies.
                    </div>
                    <Spacer y={8} />
                    <KaniButton size="lg" color="primary" className="w-fit" onPress={() => login()}>
                        Get Started
                    </KaniButton>
                </div>
            </div>

            {/* Right image - fixed */}
            <div className="fixed right-0 top-0 h-screen w-1/2">
                <KaniImage
                    src="/onboarding.webp"
                    alt="Onboarding"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    )
}
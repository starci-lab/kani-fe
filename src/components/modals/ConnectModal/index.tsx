"use client "
import React from "react"
import {
    KaniModal,
    KaniModalContent,
    KaniModalHeader,
    KaniModalBody,
    KaniButton,
    KaniInput,
    KaniModalFooter,
    KaniLink,
    KaniImage,
} from "../../atomic"
import { Divider, Spacer } from "@heroui/react"
import { useConnectModalDisclosure } from "@/hooks/singleton"

export const ConnectModal = () => {
    const { isOpen, onOpenChange } = useConnectModalDisclosure()
    return (
        <KaniModal isOpen={isOpen} onOpenChange={onOpenChange}>
            <KaniModalContent>
                <KaniModalHeader>Connect</KaniModalHeader>
                <KaniModalBody>
                    <KaniButton
                        variant="flat"
                        color="primary"
                        startContent={
                            <KaniImage
                                removeWrapper
                                className="w-5 h-5"
                                src="/icons/google.svg"
                            />
                        }
                    >
            Continue with Google
                    </KaniButton>
                    <Spacer y={4}/>
                    <div className="flex items-center gap-1">
                        <Divider className="flex-1"/>
                        <div className="text-xs text-foreground-500">OR</div>
                        <Divider className="flex-1"/>
                    </div>
                    <Spacer y={4}/>
                    <div className="flex">
                        <KaniInput placeholder="Email" radius="none" classNames={{
                            inputWrapper: "!rounded-l-medium",
                        }}/>
                        <KaniButton variant="flat" className="rounded-l-none">Continue</KaniButton>
                    </div>
                </KaniModalBody>
                <KaniModalFooter>
                    <div className="flex items-center gap-1">
                        <KaniLink as={"button"} className="text-xs text-foreground-500" color="foreground">Terms</KaniLink>
                        <div className="text-foreground-500 text-xs">•</div>
                        <KaniLink as={"button"} className="text-xs text-foreground-500" color="foreground">Privacy</KaniLink>
                    </div>
                </KaniModalFooter>
            </KaniModalContent>
        </KaniModal>
    )
}
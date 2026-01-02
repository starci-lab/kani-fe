
import {
    Modal,
    ModalProps,
    ModalContentProps,
    ModalBodyProps,
    ModalContent,
    ModalHeader,
    ModalBody,
    cn,
    ModalFooter,
    ModalFooterProps,
    HTMLHeroUIProps,
    Spacer
} from "@heroui/react"
import React from "react"
import { KaniButton } from "../KaniButton"
import { ArrowLeftIcon } from "@phosphor-icons/react"

export const KaniModal = (props: ModalProps) => {
    return <Modal {...props} />
}

export const KaniModalContent = (props: ModalContentProps) => {
    return <ModalContent {...props} />
}

export interface KaniModalHeaderProps extends HTMLHeroUIProps<"div"> {
    title: string;
    description?: React.ReactNode;
    onPrev?: () => void;
}

export const KaniModalHeader = ({ title, description, onPrev, ...props }: KaniModalHeaderProps) => {
    return (
        <ModalHeader className="justify-center pb-2" {...props}>
            {onPrev && (
                <div className="absolute left-4 top-[14px]">
                    <KaniButton size="sm" variant="light" isIconOnly radius="full" onPress={onPrev}>
                        <ArrowLeftIcon />
                    </KaniButton>
                </div>
            )}
            <div className="text-center">
                <div className="text-lg font-bold">{title}</div>
                {description && (
                    <>
                        <Spacer y={2}/>
                        <div className="text-xs text-foreground-500 font-normal">{description}</div>
                    </>
                )}
            </div>
        </ModalHeader>
    )
}

export const KaniModalBody = (props: ModalBodyProps) => {
    return <ModalBody className={cn("gap-0 p-4", props.className)} {...props} />
}

export const KaniModalFooter = (props: ModalFooterProps) => {
    return <ModalFooter className={cn("p-4 justify-center pt-2", props.className)} {...props} />
}

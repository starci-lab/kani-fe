
import {
    Modal,
    ModalProps,
    ModalContentProps,
    ModalHeaderProps,
    ModalBodyProps,
    ModalContent,
    ModalHeader,
    ModalBody,
    cn,
    ModalFooter,
    ModalFooterProps
} from "@heroui/react"
import React from "react"

export const KaniModal = (props: ModalProps) => {
    return <Modal {...props} />
}

export const KaniModalContent = (props: ModalContentProps) => {
    return <ModalContent {...props} />
}

export const KaniModalHeader = (props: ModalHeaderProps) => {
    return <ModalHeader className={cn("justify-center", props.className)} {...props} />
}

export const KaniModalBody = (props: ModalBodyProps) => {
    return <ModalBody className={cn("gap-0 p-4", props.className)} {...props} />
}

export const KaniModalFooter = (props: ModalFooterProps) => {
    return <ModalFooter className={cn("p-4 justify-center", props.className)} {...props} />
}

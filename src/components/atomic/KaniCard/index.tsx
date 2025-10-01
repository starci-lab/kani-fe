import React from "react"
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    HTMLHeroUIProps,
    Spacer,
} from "@heroui/react"
import { CardProps } from "@heroui/react"

export const KaniCard = (props: CardProps) => {
    return <Card {...props} />
}

export const KaniCardBody = (props: HTMLHeroUIProps<"div">) => {
    return <CardBody {...props} />
}

export interface KaniCardHeaderProps extends HTMLHeroUIProps<"div"> {
  title: string;
  description?: React.ReactNode;
}
export const KaniCardHeader = (props: KaniCardHeaderProps) => {
    return (
        <CardHeader className="justify-center" {...props}>
            <div className="text-center">
                <div className="text-lg font-bold">{props.title}</div>
                <Spacer y={2}/>
                {props.description && (
                    <div className="text-xs text-foreground-500">{props.description}</div>
                )}
            </div>
        </CardHeader>
    )
}

export const KaniCardFooter = (props: HTMLHeroUIProps<"div">) => {
    return <CardFooter {...props} />
}

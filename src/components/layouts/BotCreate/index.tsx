"use client"
import React from "react"
import { Bots } from "../BotList/Bots"
import { KaniBreadcrumb, KaniBreadcrumbItem } from "@/components/atomic"
import { Spacer } from "@heroui/react"
import { paths } from "@/modules"
import { useRouter } from "next/navigation"
import { SetUpYourBot } from "./SetUpYourBot"
export const BotCreate = () => {
    const router = useRouter()
    return (
        <div>
            <KaniBreadcrumb>
                <KaniBreadcrumbItem onPress={() => router.push(paths().bots().base())}>Bots</KaniBreadcrumbItem>
                <KaniBreadcrumbItem>Create</KaniBreadcrumbItem>
            </KaniBreadcrumb>
            <Spacer y={6}/>
            <SetUpYourBot/>
            <Bots/>
        </div>
    )
}
import useSWR from "swr"
import { useAppSelector } from "@/redux"
import { queryBot } from "@/modules/api"

export const useQueryBot = () => {
    const id = useAppSelector((state) => state.bot.id)
    useSWR(
        id ? ["QUERY_BOT", id] : null,
        async () => {
            if (!id) {
                throw new Error("Id is required")
            }
            await queryBot({
                request: {
                    id,
                },
            })
        }
    )
}
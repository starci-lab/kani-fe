export const paths = () => ({
    bots: () => ({
        base: () => "/bots",
        create: () => "/bots/create",
        bot: (id: string) => `/bots/${id}`,
    }),
})
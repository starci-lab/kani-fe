export const paths = () => ({
    base: () => "/",
    bots: () => ({
        base: () => "/bots",
        create: () => "/bots/create",
        bot: (id: string) => `/bots/${id}`,
    }),
})
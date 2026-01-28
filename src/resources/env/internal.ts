export const internalEnv = () => {
    return {
        isProduction: process.env.VERCEL_ENV === "production",
    }
}

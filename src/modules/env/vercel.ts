export const vercelEnv = () => {
    return {
        isProduction: process.env.VERCEL_ENV === "production",
    }
}
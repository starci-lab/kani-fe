export enum CookieKey {
    RefreshToken = "refresh_token",
}

export const setCookie = (key: CookieKey, value: string) => {
    document.cookie = `${key}=${value}; path=/; secure; samesite=strict`
}

export const getCookie = (key: CookieKey) => {
    const value = document.cookie.split(`; ${key}=`).pop()?.split(";")[0]
    return value ? decodeURIComponent(value) : undefined
}

export const removeCookie = (key: CookieKey) => {
    document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; samesite=strict`
}
import superjson from "../superjson"
export * from "./local"

export enum LocalStorageKey {
    AccessToken = "access_token",
}

const getLocalStorageKey = (key: LocalStorageKey) => {
    return `kani:${key}`
}

export const setLocalStorageItem = <T>(
    key: LocalStorageKey, 
    value: T
) => {
    localStorage.setItem(
        getLocalStorageKey(key), 
        superjson.stringify(value)
    )
}

export const getLocalStorageItem = <T>(
    key: LocalStorageKey
) => {
    const item = localStorage.getItem(getLocalStorageKey(key))
    if (!item) {
        return null
    }
    return superjson.parse<T>(item)
}

export const removeLocalStorageItem = (
    key: LocalStorageKey
) => {
    localStorage.removeItem(getLocalStorageKey(key))
}
import "server-only"

const dictionaries = {
    en: () => import("./dictionaries/en.json").then((m) => m.default),
    vi: () => import("./dictionaries/vi.json").then((m) => m.default),
}

export const getDictionary = async (locale: "en" | "vi") => {
    return dictionaries[locale]()
}
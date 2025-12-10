export const centerPad = (str: string, front: number, back: number): string => {
    if (str.length <= front + back) return str
    return `${str.substring(0, front)}...${str.substring(str.length - back)}`
}

export const truncateWithEllipsis = (str: string | undefined, maxLength = 12) => {
    if (!str) return ""
    if (str.length <= maxLength) return str
    return str.slice(0, maxLength) + "..."
}
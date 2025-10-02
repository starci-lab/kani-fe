export const centerPad = (str: string, front: number, back: number): string => {
    if (str.length <= front + back) return str
    return `${str.substring(0, front)}...${str.substring(str.length - back)}`
}
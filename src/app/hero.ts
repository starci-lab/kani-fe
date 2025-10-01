// hero.ts
import { heroui } from "@heroui/react"
export default heroui({
    themes: {
        light: {
            colors: {
                primary: {
                    "DEFAULT": "hsl(330, 87%, 71%)", 
                    foreground: "hsl(0, 0%, 100%)",
                }, 
            },
        },
        dark: {
            colors: {
                primary: {
                    "DEFAULT": "hsl(330, 87%, 71%)", 
                    foreground: "hsl(202, 24%, 9%)",
                }, 
            },
        },
    }
})
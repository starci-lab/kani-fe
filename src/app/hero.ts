// hero.ts
import { heroui } from "@heroui/react"
export default heroui({
    themes: {
        light: {
            colors: {
                primary: {
                    "DEFAULT": "hsl(330, 87%, 71%)", 
                    foreground: "hsl(0, 0%, 100%)",
                    100: "hsl(330, 87%, 95%)", // very light
                    200: "hsl(330, 87%, 88%)",
                    300: "hsl(330, 87%, 80%)",
                    400: "hsl(330, 87%, 74%)",
                    500: "hsl(330, 87%, 71%)", // main (DEFAULT)
                    600: "hsl(330, 87%, 62%)",
                    700: "hsl(330, 87%, 52%)",
                    800: "hsl(330, 87%, 42%)",
                    900: "hsl(330, 87%, 32%)", // darkest
                }, 
            },
        },
        dark: {
            colors: {
                primary: {
                    "DEFAULT": "hsl(330, 87%, 71%)", 
                    foreground: "hsl(202, 24%, 9%)",
                    100: "hsl(330, 87%, 95%)", // very light
                    200: "hsl(330, 87%, 88%)",
                    300: "hsl(330, 87%, 80%)",
                    400: "hsl(330, 87%, 74%)",
                    500: "hsl(330, 87%, 71%)", // main (DEFAULT)
                    600: "hsl(330, 87%, 62%)",
                    700: "hsl(330, 87%, 52%)",
                    800: "hsl(330, 87%, 42%)",
                    900: "hsl(330, 87%, 32%)", // darkest
                }, 
            },
        },
    }
})
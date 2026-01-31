// hero.ts
import { heroui } from "@heroui/react"
export default heroui({
    themes: {
        light: {
            colors: {
                primary: {
                    DEFAULT: "#FE6D9C",
                    foreground: "#ffffff",
                    50:  "#FFF1F6",
                    100: "#FFE3EC",
                    200: "#FFC1D3",
                    300: "#FFA0BA",
                    400: "#FF84A7",
                    500: "#FE6D9C", // main
                    600: "#F04F87",
                    700: "#D93A70",
                    800: "#B62A58",
                    900: "#8F1A40",
                },     
                secondary: {
                    DEFAULT: "#3B82F6",
                    50:  "#EFF6FF",
                    100: "#DBEAFE",
                    200: "#BFDBFE",
                    300: "#93C5FD",
                    400: "#60A5FA",
                    500: "#3B82F6", // main 
                    600: "#2563EB",
                    700: "#1D4ED8",
                    800: "#1E40AF",
                    900: "#1E3A8A",
                }
            },
        },
        dark: {
            colors: {
                primary: {
                    DEFAULT: "#FE6D9C",
                    foreground: "#ffffff",
                    50:  "#8F1A40",
                    100: "#B62A58",
                    200: "#D93A70",
                    300: "#F04F87",
                    400: "#FE6D9C",
                    500: "#FF84A7",
                    600: "#FFA0BA",
                    700: "#FFC1D3",
                    800: "#FFE3EC",
                    900: "#FFF1F6",
                },     
                secondary: {
                    DEFAULT: "#3B82F6",
                    50:  "#1E3A8A",
                    100: "#1E40AF",
                    200: "#1D4ED8",
                    300: "#2563EB",
                    400: "#3B82F6",
                    500: "#60A5FA",
                    600: "#93C5FD",
                    700: "#BFDBFE",
                    800: "#DBEAFE",
                    900: "#EFF6FF",
                }
            },
        },
    }
})
import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
    colors: {
        gray: {
            "990": "#1B1B1B",
             "900": "#181B23",
             "800": "#1F2829",
             "700": "#353646",
             "600": "#4B4D63",
             "500": "#616480",
             "400": "#797D9A",
             "300": "#9699B0",
             "200": "#B3B5C6",
             "100": "#D1D2DC",
             "50": "#EEEEF2",
        },
    },
    shadows: {
        buttonShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;",
        innerShadow: "rgba(0, 0, 0) 3px 3px 6px 0px inset, rgba(0, 0, 0, 0.5) -3px -3px 6px 1px inset;",
    },
    font: {
        heading: 'Roboto',
        body: 'Roboto'
    },
    styles: {
        global: {
            body: {
                bgImage: "/img/bg.svg",
                bgRepeat: "no-repeat",
                bgPosition: "center",
                bgSize: 'cover',
                bg: 'gray.990',
                color: 'gray.50'
            }
        }
        
    }
})
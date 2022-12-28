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
        }
    },
    font: {
        heading: 'Roboto',
        body: 'Roboto'
    },
    styles: {
        global: {
            body: {
                bg: 'gray.990',
                color: 'gray.50'
            }
        }
    }
})
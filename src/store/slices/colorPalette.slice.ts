import { createSlice } from "@reduxjs/toolkit"

export type GlobalColorPaletteType = {
    "bg-color": string
    "second-bg-color": string
    "third-bg-color": string
    "text-color": string
    "second-text-color": string
    "icon-color": string
}

export const lightColorTheme: GlobalColorPaletteType = {
    "bg-color": "#FFFAFF",
    "second-bg-color": "#f5e7cf",
    "third-bg-color": "white",
    "text-color": "#1A1423",
    "second-text-color": "#2F2937",
    "icon-color": "white",
}

export const darkColorTheme: GlobalColorPaletteType = {
    "bg-color": "#212121",
    "second-bg-color": "#292929",
    "third-bg-color": "#383838",
    "text-color": "#e4e4e4",
    "second-text-color": "#a3a3a3",
    "icon-color": "#a0a0a0",
}

const slice = createSlice({
    name: "colorPalette",
    initialState: darkColorTheme,
    reducers: {
        setDarkTheme: (state) => {
            return darkColorTheme
        },
        setLightTheme: (state) => {
            return lightColorTheme
        },
    },
})

export const colorPaletteActions = slice.actions
export const colorPaletteReducer = slice.reducer

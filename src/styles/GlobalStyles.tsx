
import React from "react"
import { useState } from "react"
import { useAppSelector } from "store/store"
import { createGlobalStyle } from "styled-components"



export const GlobalStyle = () => {

    const colorPalette = useAppSelector(state => state.theme)

    const GlobalStyleSettings = createGlobalStyle<{ colorPalette: any }>`
    :root {
        --bg-color: ${(props) => props.colorPalette["bg-color"]};
        --second-bg-color: ${(props) => props.colorPalette["second-bg-color"]};
        --third-bg-color: ${(props) => props.colorPalette["third-bg-color"]};
        --text-color: ${(props) => props.colorPalette["text-color"]};
        --second-text-color: ${(props) => props.colorPalette["second-text-color"]};
        --icon-color: ${(props) => props.colorPalette["icon-color"]};
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background: var(--bg-color);
        color: var(--text-color);
        font-family: "Poppins", sans-serif;
    }

    html {
        font-size: 90%;
    }

    @media (max-width: 900px) {
        html {
            font-size: 70%;
        }
    }
`

    return <GlobalStyleSettings colorPalette={colorPalette}/>
}

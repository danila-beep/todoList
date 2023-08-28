import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./app/App"
import { Provider } from "react-redux"
import store from "./store/store"
import Preloader from "./components/Preloader/Preloader"
import { BrowserRouter } from "react-router-dom"
import { GlobalStyle } from "styles/GlobalStyles"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <GlobalStyle />
            <App />
        </BrowserRouter>
    </Provider>,
)

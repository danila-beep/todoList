import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";
import Preloader from "./components/Preloader/Preloader";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <React.Suspense fallback={<Preloader />}>
      <App />
    </React.Suspense>
  </Provider>
);

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./App.css";
import { registerSW } from 'virtual:pwa-register';

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);

registerSW({
    onNeedRefresh() {
        console.log("Une nouvelle version est disponible. Veuillez actualiser.");
    },
    onOfflineReady() {
        console.log("L'application est prête à être utilisée hors-ligne.");
    }
});
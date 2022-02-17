import React from "react";
import ReactDOM from "react-dom";
import App from "./compontents/App";
import { ThemeProvider } from "styled-components";

//全域變數
const theme = {
    colors: {
        primary_300: "#d50d0d",
        primary_500: "#ff8686",
        primary_700: "#e1a0a0",
    },
};

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>,
    document.getElementById("root")
);

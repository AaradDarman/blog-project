import React from "react";
import Blog from "./Blog";
import { lightTheme, darkTheme } from "../utils/themes";
import { GlobalStyles } from "../utils/global-stylel";
import { useDarkMode } from "../utils/useDarkMode";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "styled-components";

const App = () => {
  const [theme, toggleTheme, componentMounted] = useDarkMode();

  const themeMode = theme === "light" ? lightTheme : darkTheme;

  if (!componentMounted) {
    return <div />;
  }
  return (
    <ThemeProvider theme={themeMode}>
      <BrowserRouter>
        <ToastContainer theme="dark" />
        <GlobalStyles />
        <Blog />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;

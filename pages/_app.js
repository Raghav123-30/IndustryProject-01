
import "@/styles/globals.css";
import AppContext from "./AppContext";
import NavbarComponenet from "./navbar";
import React, { useEffect } from "react";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import LandingPage from "./landing";
import dynamic from "next/dynamic";
import { ElevatorSharp } from "@mui/icons-material";
import Cookies from "js-cookie";


export default function App({ Component, pageProps }) {
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const status = Cookies.get("signedIn");
    if (status === "true") {
      setLoggedIn(true);
    }
  }, []);

  return (
    <NextUIProvider>
      <AppContext.Provider value={{ loggedIn, setLoggedIn }}>
      {!loggedIn && <LandingPage />}
        {loggedIn && <NavbarComponenet />}
        {loggedIn && <Component {...pageProps} />}
      </AppContext.Provider>
    </NextUIProvider>
  );
}


import "@/styles/globals.css";
import AppContext from "./AppContext";
import { Progress,Grid } from "@nextui-org/react";
import NavbarComponenet from "./navbar";
import React, { useEffect } from "react";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import LandingPage from "./landing";
import dynamic from "next/dynamic";
import { ElevatorSharp } from "@mui/icons-material";
import Cookies from "js-cookie";
import { useState } from "react";
import { sha256 } from 'crypto-hash';


React.useLayoutEffect = React.useEffect 


const darkTheme = createTheme({
  type: 'dark',
  theme: {
    // override dark theme colors
  }
});


export default function App({ Component, pageProps }) {
  const [wait, setWait] = useState(true);
  const [loggedIn, setLoggedIn] = React.useState(false);

React.useLayoutEffect(() => {
    async function handle(){
      const hash = Cookies.get("signedIn");
      await fetch('/api/verifyUser',{
        method:'POST',
        body : JSON.stringify({
           hash : hash
        })
      }).then((response) => {
        return response.json()
      }).then(data => {
        if(data.auth){
          setLoggedIn(true);
        }
        else{
          setLoggedIn(false);
        }
      })
      setWait(false);
    }
    handle();
  }, []);
 
  return (
    <NextUIProvider >
      <AppContext.Provider value={{ loggedIn, setLoggedIn }}>
        {wait ? (
          <Grid.Container css={{marginTop:'50%'}}>
            <Grid xs={12} gap={2}>
            <Progress
          indeterminated
          value={50}
          color="secondary"
          status="secondary"
        />
            </Grid>
          </Grid.Container>
        ) : (
          <>
            {!loggedIn && <LandingPage />}
            {loggedIn && <NavbarComponenet />}
            {loggedIn && <Component {...pageProps} />}
          </>
        )}
      </AppContext.Provider>
    </NextUIProvider>
  );
}

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



const theme = createTheme({
    type: 'light',
    theme: {
      
      colors: {
        // generic colors
        white: '#ffffff',
        black: '#000000',
    
        // background colors (light)
        background: "#EAF4FF",
        backgroundAlpha: "rgba(255, 255, 255, 0.8)", // used for semi-transparent backgrounds like the navbar
        foreground: "$black",
        backgroundContrast: "$white",
    
    
        //semantic colors (light)
        blue50: '#EDF5FF',
        // ...
        blue900: '#00254D',
        // ...
    
        // brand colors
        primaryLight: '$blue200',
        primaryLightHover: '$blue300', // commonly used on hover state
        primaryLightActive: '$blue400', // commonly used on pressed state
        primaryLightContrast: '$blue600', // commonly used for text inside the component
        primary: '$blue600',
        primaryBorder: '$blue500',
        primaryBorderHover: '$blue600',
        primarySolidHover: '$blue700',
        primarySolidContrast: '$white', // commonly used for text inside the component
        primaryShadow: '$blue500'
    
        // ... rest of colors (secondary, success, warning, error, etc)
      }
    }
    
      
    
})



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
    <NextUIProvider  theme={theme}>
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

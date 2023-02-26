import React, { useEffect } from "react";

import AppContext from "./AppContext";
import Cookies from "js-cookie";
const Logout = () => {
    const [loggedIn, setLoggedIn] = React.useState();
   useEffect(() => {
    Cookies.set("signedIn", false);
       
   },[])
  return (
    <AppContext.Provider value={{ loggedIn, setLoggedIn }}>
        <div></div>;
    </AppContext.Provider>
  )
};

export default Logout;

import React from "react";

const AppContext = React.createContext({
    loggedIn:false,
    setLoggedIn: () => {}
});

export default AppContext;
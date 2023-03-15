import React, { useState } from "react";
import  Context from "./AuthContext"
import { defaultState } from "./AuthContext";

const AuthContextProvider = (props) => {
   
    const [authState,setAuthState] = useState(defaultState);

   
    
    return(
        <Context.Provider value ={{authState,setAuthState}}>
            {props.children}
        </Context.Provider>
    )
   
}

export default AuthContextProvider; 
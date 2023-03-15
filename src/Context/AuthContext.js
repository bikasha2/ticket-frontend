import { createContext } from "react";

const defaultState = {token:localStorage.getItem("token"), isAuthenticated: false}
const AuthContext = createContext()

 
export default AuthContext;
export {defaultState};


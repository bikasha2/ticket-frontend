import React, {useContext} from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom"

import Dashboard from './Components/UserDashboard/Dashboard';
import Login from './Components/Login';
import ViewTicket from "./Components/Ticket/ViewTicket";
import NoMatch from './Components/NoMatch';
import './App.css';
import AuthContext from './Context/AuthContext';




function App() {
 
  const {authState,setAuthState} = useContext(AuthContext);

  return (
    <>
   
    <Router>
      <Switch>
        <Route exact path="/" component={Dashboard}>
         
        </Route>
        <Route exact path="/login" >
        {authState.isAuthenticated ? <Redirect to="/tickets" /> : <Login />}
        </Route>
          <Route exact path="/tickets"  >
          {!authState.isAuthenticated ? <Redirect to="/login" /> : <ViewTicket />}
          </Route>
        <Route exact path="*" component={NoMatch} />
      </Switch>
    </Router>
  
    </>
  );
}

export default App;

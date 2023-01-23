import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import Dashboard from './Components/UserDashboard/Dashboard';
import Login from './Components/Login';
// import Register from './Components/Register';
import ViewTicket from "./Components/Ticket/ViewTicket";
import NoMatch from './Components/NoMatch';
import './App.css';


function App() {
  // const token = window.localStorage.getItem('token')
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/login" component={Login} />
          {/* <Route exact path="/register" component={Register} /> */}
          {/* {
            token ? <Route exact path="/tickets" component={ViewTicket} /> :  <Route exact path="/" component={Dashboard} />
          } */}
          <Route exact path="/tickets" component={ViewTicket} />
          <Route exact path="*" component={NoMatch} />
        
        </Switch>
      </Router>
     
    </>
  );
}

export default App;

import React from 'react'
import { LoginScreen } from '../auth/LoginScreen'
import { CalendarScreen } from '../calendar/CalendarScreen';
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route
  } from "react-router-dom";
  

export const AppRouter = () => {
    return (
        <Router>
        <div>
            <Switch>
                 <Route  exact path="/login" component={ LoginScreen } /> 
                 <Route exact path="/" component={ CalendarScreen } />
                 <Redirect to="/" /> 
            </Switch>
        </div>
    </Router>
    )
}

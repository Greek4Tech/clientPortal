import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// List of components
import Navbar from "./components/layout/Navbar";
import SignIn from "./components/auth/SignIn";
import CreatePatient from "./components/doctor/CreatePatient";
import PatientList from "./components/doctor/PatientList";
import MyProfile from "./components/patient/MyProfile";
import PrivateRoute from "./components/auth/PrivateRoute";
import Login from "./components/auth/SignIn";
import Demo_form from "./components/doctor/editform";
import NotFoundPage from "./components/layout/404page";

// sss

function App(props) {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
      </div>
      {/* The <Switch> element is used to group the <Route> elements 
      and ensure that only the first matching route will be rendered. */}
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/signin" component={SignIn} />
        <PrivateRoute
          path="/edit/:id"
          component={Demo_form}
          auth={props.auth}
        />
        <PrivateRoute
          path="/create"
          component={CreatePatient}
          auth={props.auth}
        />
        <PrivateRoute
          path="/patientlist"
          component={PatientList}
          auth={props.auth}
        />
        <Route path="/myprofile/:id" component={MyProfile} />
        {/* The final <Route> element has a path property of "*", which is a wildcard that matches any URL 
        path that has not already been matched by a previous route. This route is typically used to render a "not found" or "404" 
        page for URLs that do not match any other defined routes. */}
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(App);

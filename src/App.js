import React ,{useState} from "react";
import Welcome from "./components/welcome/Welcome";
import Home from "./components/home/Home";
import Signin from "./components/signin/Signin";
import Signup from "./components/signup/Signup";
import { Redirect, Route, Switch,withRouter } from "react-router-dom";
import {Account} from "./Account";
import ViewImage from "./components/ViewImage/ViewImage";


function App() {

  const [isAuthenticated,setAuthentication] = useState(0);

  function authHandler(x)
  {
    setAuthentication(x)
  }

  let routes = <Switch>
                  <Route path="/" exact>
                    <Welcome/>
                  </Route>
                  <Route path="/Signin">
                    <Signin changeAuthState = {authHandler} />
                  </Route>
                  <Route path="/Signup">
                    <Signup changeAuthState = {authHandler} />
                  </Route>
                  <Redirect to="/"></Redirect>
                </Switch>

  if(isAuthenticated===1)
  {
      routes = <Switch>
      <Route path="/" exact>
        <Welcome/>
      </Route>
      <Route path="/Signin" exact>
        <Signin changeAuthState = {authHandler} />
      </Route>
      <Route path="/Signup" exact>
        <Signup changeAuthState = {authHandler} />
      </Route>
      <Route path="/Home" exact>
        <Home changeAuthState = {authHandler} />
      </Route>
      <Route path="/Home/:ImageID">
          <ViewImage changeAuthState = {authHandler} />
      </Route>
    </Switch>
  }

  return (
      <div>
       <Account>
          {routes}
       </Account>
      </div>
  );
}

export default withRouter(App);

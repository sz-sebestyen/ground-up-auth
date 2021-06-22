import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Registration from "./Registration";
import Login from "./Login";
import Navigation from "../components/Navigation";

const Router = () => (
  <BrowserRouter>
    <Navigation />

    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="/registration">
        <Registration />
      </Route>

      <Route exact path="/login">
        <Login />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Router;

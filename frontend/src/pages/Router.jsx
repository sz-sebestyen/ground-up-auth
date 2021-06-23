import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Registration from "./Registration";
import Login from "./Login";
import Confirm from "./Confirm";

const Router = () => (
  <BrowserRouter>
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

      <Route exact path="/confirm">
        <Confirm />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Router;

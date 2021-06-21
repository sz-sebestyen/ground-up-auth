import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Registration from "./Registration";
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
    </Switch>
  </BrowserRouter>
);

export default Router;

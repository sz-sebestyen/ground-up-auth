import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Registration from "./Registration";

const Router = () => (
  <BrowserRouter>
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

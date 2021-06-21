import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Router;

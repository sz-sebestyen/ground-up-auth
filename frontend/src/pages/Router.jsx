import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Registration from "./Registration";
import Login from "./Login";
import Confirm from "./Confirm";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import NotFound from "./NotFound";

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

      <Route exact path="/forgot-password">
        <ForgotPassword />
      </Route>

      <Route exact path="/reset">
        <ResetPassword />
      </Route>

      <Route path="/*">
        <NotFound />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Router;

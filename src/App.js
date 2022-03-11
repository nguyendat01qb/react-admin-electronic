import { Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./containers/Home";
import Signin from "./containers/Signin";
import Signup from "./containers/Signup";
import PrivateRoute from "./components/HOC/PrivateRoute";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn, getInitialData } from "./actions";
import NewPage from "./containers/NewPage";
import Categories from "./containers/Categories";
import Products from "./containers/Products";
import Orders from "./containers/Orders";
import Users from "./containers/Users";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if (auth.authenticate) {
      dispatch(getInitialData());
    }
  }, [auth.authenticate]);

  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/react-admin-electronic/" exact component={Home} />
        <PrivateRoute
          path="/react-admin-electronic/users"
          exact
          component={Users}
        />
        <PrivateRoute path="/react-admin-electronic/page" component={NewPage} />
        <PrivateRoute
          path="/react-admin-electronic/categories"
          component={Categories}
        />
        <PrivateRoute
          path="/react-admin-electronic/products"
          component={Products}
        />
        <PrivateRoute
          path="/react-admin-electronic/orders"
          component={Orders}
        />
        <Route path="/react-admin-electronic/signin" component={Signin} />
        <Route path="/react-admin-electronic/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;

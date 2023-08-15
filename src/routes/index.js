import React from "react";
import { Route, Switch } from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const App = ({ match }) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route
        path={`${match.url}`}
        exact
        component={asyncComponent(() => import("./dashboard/index"))}
      />
      <Route
        path={`${match.url}Signin`}
        exact
        component={asyncComponent(() => import("../containers/SignIn"))}
      />
      <Route
        path={`${match.url}Search/:searchText`}
        exact
        component={asyncComponent(() => import("./search/index"))}
      />
      <Route
        path={`${match.url}category`}
        exact
        component={asyncComponent(() => import("./category/index"))}
      />
      <Route
        path={`${match.url}usermanage`}
        exact
        component={asyncComponent(() => import("./user/index"))}
      />
      <Route
        path={`${match.url}material`}
        exact
        component={asyncComponent(() => import("./meterial/index"))}
      />
      <Route
        path={`${match.url}stock`}
        exact
        component={asyncComponent(() => import("./stock/index"))}
      />

      <Route
        path={`${match.url}stock/detail/:id`}
        exact
        component={asyncComponent(() => import("./stock/detail"))}
      />
      <Route
        path={`${match.url}order`}
        exact
        component={asyncComponent(() => import("./order/index"))}
      />

      <Route
        path={`${match.url}catalog`}
        exact
        component={asyncComponent(() => import("./catalog/index"))}
      />

      <Route
        path={`${match.url}machine/detail/:id`}
        exact
        component={asyncComponent(() => import("./catalog/detail"))}
      />

      <Route
        path={`${match.url}GroupMeterial/MaterialList/:id`}
        exact
        component={asyncComponent(() => import("./catalog/materiallist"))}
      />
      <Route
        path={`${match.url}store`}
        exact
        component={asyncComponent(() => import("./store/index"))}
      />
      <Route
        path={`${match.url}overview`}
        exact
        component={asyncComponent(() => import("./overview/index"))}
      />
    </Switch>
  </div>
);

export default App;

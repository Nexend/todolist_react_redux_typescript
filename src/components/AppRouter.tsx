import React, { FC } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { privateRoutes, publicRoutes, RouteNames } from "../router";
import { useTypedSelector } from "../hooks/useTypedSelector";

const AppRouter: FC = () => {
  const { isAuth } = useTypedSelector((state) => state.auth);

  return isAuth ? (
    <Switch>
      {privateRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
      <Redirect to={RouteNames.EVENT} />
    </Switch>
  ) : (
    <Switch>
      {publicRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
      <Redirect to={RouteNames.LOGIN} />
    </Switch>
  );
};

export default AppRouter;

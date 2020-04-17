/**
 *
 * PrivateRoute
 *
 */

import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { LocalStorage } from 'enums/LocalStorage';
import { Routes } from 'enums/Routes';

interface IPrivateRoute {
  path: string;
  exact?: boolean;
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<IPrivateRoute> = ({ children, ...props }) => {
  const history = useHistory();

  if (!localStorage.getItem(LocalStorage.X_TOKEN)) {
    history.push(Routes.HOME);
  }

  return <Route {...props}>{children}</Route>;
};

export default PrivateRoute;

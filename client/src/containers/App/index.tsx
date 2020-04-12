import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { GlobalStyle } from 'styles/global';
import { Routes } from 'enumerations';
// import PrivateRoute from 'containers/PrivateRoute';
import FullPageLoader from 'components/Loaders/FullPageLoader';
import Header from 'containers/Header';

const Home = React.lazy(() => import('pages/Home'));
const Checkout = React.lazy(() => import('pages/Checkout'));

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Layout>
      <Suspense fallback={<FullPageLoader />}>
        <Switch>
          <Route exact path={Routes.HOME}>
            <Home />
          </Route>
          <Route exact path={Routes.CHECKOUT}>
            <Checkout />
          </Route>
          {/* <PrivateRoute exact path={Routes.dashboard}>
            <Dashboard />
          </PrivateRoute> */}
        </Switch>
        <GlobalStyle />
      </Suspense>
    </Layout>
  );
};

export default App;

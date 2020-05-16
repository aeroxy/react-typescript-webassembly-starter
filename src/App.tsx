import React, {
  FunctionComponent,
  Suspense,
  lazy
} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from 'lib/theme';
import { rootPath } from 'config';
const LoginLayout = lazy(() => import('layouts/Login/Login'));

const App: FunctionComponent = () => (
  <MuiThemeProvider theme={theme}>
    <Router basename={rootPath}>
      <Switch>
        <Route
          path="/"
          exact
          render={
            () => (
              <Suspense fallback={null}>
                <LoginLayout />
              </Suspense>
            )
          }
        />
        <Redirect to="/" />
      </Switch>
    </Router>
  </MuiThemeProvider>
);

export default App;

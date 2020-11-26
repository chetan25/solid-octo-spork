import React, { lazy, Suspense, Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import {Dispatch} from "redux";

import { checkUserSession, setCurrentUser } from "./redux/user/user-actions";
import { userSelector } from "./redux/user/user-selectors";
import { IUser, IStore } from './interfaces/user';
import styled from 'styled-components';

import { Spinner, ErrorBoundary } from '@cd-workspace/ui';

const LoginPage = lazy(() => import('./pages/login/login'));
const HomePage = lazy(() => import('./pages/home/home'));
import "regenerator-runtime/runtime";

interface AppProps {
  checkSession: () => void;
  setCurrentUser: (user: IUser) => void;
  currentUser: IUser|null;
  pageLoading: boolean;
}

interface PrivateRouteProps {
  children: React.ReactNode;
  currentUser: IUser|null;
  path: string;
  exact?: boolean;
}

const PageSpinner = styled(Spinner)`
 height: 100vh;
`;
// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
const PrivateRoute = ({ children, currentUser, path, exact = false }: PrivateRouteProps) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={({ location }) =>
        currentUser ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

class App extends Component<AppProps> {
  componentDidMount(): void {
    this.props.checkSession();
    setTimeout(() => {
      this.props.setCurrentUser({
        createdAt: '2020-10-10',
        displayName: 'Test',
        email: 'test@gmail.com',
        id: '111'
      })
    }, 600);
  }

  render() {
    const { currentUser } = this.props;
    console.log(currentUser, 'currentUser');
    return (
      <div>
        { this.props.pageLoading ? <PageSpinner /> :
          <Switch>
            <ErrorBoundary>
              <Suspense fallback={<Spinner />}>
                <PrivateRoute exact path='/' currentUser={currentUser}>
                  <HomePage/>
                </PrivateRoute>
                <Route
                  path='/login'
                  render={({ location }) =>
                    !currentUser ? (
                      <LoginPage />
                    ) : (
                      <Redirect
                        to={{
                          pathname: "/",
                          state: { from: location }
                        }}
                      />
                    )
                  }
                />
              </Suspense>
            </ErrorBoundary>
          </Switch>
        }
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  checkSession: () => dispatch(checkUserSession()),
  setCurrentUser: (user: IUser) => dispatch(setCurrentUser(user))
});
const mapStateToProps = (state: IStore ) => ({
  currentUser: userSelector(state),
  pageLoading: state.user.pageLoading
});
export default connect(mapStateToProps, mapDispatchToProps)(App);


import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Route, Switch, Redirect } from 'react-router-dom';

import Login from './containers/Login';
import Thread from './containers/Thread';
import MakeThread from './containers/MakeThread';
import Channel from './containers/Channel';

import firebase from './Firebase';

import * as userActions from './modules/userModule';

class App extends Component {
  componentDidMount() {
    const self = this; // javascriptのthisを固定させるため
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        self.props.loggedIn(user);
      } else {
        self.props.notLoggedIn(user);
        // User is signed out.
        alert('You are not logged in yet');
        // ...
      }
    });
  }
  render() {
    return (
      <React.Fragment>
        {/* ルーティング */}
        <Switch>
          <Route exact path='/login' component={Login} />
          <AuthRoute user={this.props.user}>
            <Switch>
              <Route exact path='/' render={() => <h1>Home</h1>} />
              <Route exact path='/client/:channel' component={Channel} />
              <Route
                exact
                path='/client/:channel/makeThread'
                component={MakeThread}
              />
              <Route exact path='/client/:channel/:thread' component={Thread} />
            </Switch>
          </AuthRoute>
          <Route render={() => <p>ページが見つかりません</p>} />
        </Switch>
      </React.Fragment>
    );
  }
}

function AuthRoute({ children, user, ...rest }) {
  // ログインしているか判定する
  if (user.isCommunicated === false) {
    // firebaseとの非同期通信が終了していない場合
    return <Route render={() => <p>通信中</p>} />;
  } else {
    // ログインしていなければログイン画面にリダイレクトする
    // user.uidが存在するかで判定する
    const flag = user.uid !== null ? true : false;
    return (
      <Route render={() => (flag ? children : <Redirect to='/login' />)} />
    );
  }
}

// redux関連
function mapStateToProps(state) {
  return {
    user: state.user.user
  };
}
function mapDispatchToProps(dispatch) {
  return {
    loggedIn: user => dispatch(userActions.loggedIn(user)),
    notLoggedIn: () => dispatch(userActions.notLoggedIn())
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

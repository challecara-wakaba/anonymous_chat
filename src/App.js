import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Route,
  Switch,
  Redirect,
  useRouteMatch,
  useParams
} from 'react-router-dom';

import Login from './containers/Login';
import Thread from './containers/Thread';
import MakeThread from './containers/MakeThread';
import Channel from './containers/Channel';

import firebase from 'firebase/app';

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
          <LoggedInRoute user={this.props.user}>
            <Route exact path='/' render={() => <h1>Home</h1>} />
            <Route path='/client/:channel' component={ClientChannel} />
            <Route render={() => <p>ページが見つかりません</p>} />
          </LoggedInRoute>
        </Switch>
      </React.Fragment>
    );
  }
}

function LoggedInRoute({ children, user, ...rest }) {
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

function ClientChannel(props) {
  const path = '/client';
  const { channel } = useParams(); // /client/:channelの:channelで指定した物が入る
  const { history } = props;

  return (
    <Switch>
      <Route exact path={`${path}/${channel}`}>
        <Channel history={history} />
      </Route>
      <Route exact path={`${path}/${channel}/makeThread`}>
        <MakeThread history={history} />
      </Route>
      <Route path={`${path}/${channel}/:thread`}>
        <ClientThread history={history} />
      </Route>
      <Route render={() => <p>ページが見つかりませんん</p>} />
    </Switch>
  );
}

function ClientThread(props) {
  const { path } = useRouteMatch();
  const { thread } = useParams(); // /client/channel/:threadの:threadで指定した物が入る
  const { history } = props;

  // :threadを取り除く
  const basePath = path
    .split('/')
    .slice(0, 3)
    .join('/');

  return (
    <switch>
      <Route exact path={`${basePath}/${thread}`}>
        <Thread history={history} />
      </Route>
      {/* <Route render={() => <p>ページが見つかりませんんん</p>} /> */}
    </switch>
  );
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

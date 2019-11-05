import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Route, Switch, useRouteMatch, useParams } from 'react-router-dom';

import Login from './containers/Login';
import Thread from './containers/Thread';
import MakeThread from './containers/MakeThread';
import Channel from './containers/Channel';

import firebase from 'firebase/app';
import 'firebase/auth';
// import config from './config/firebaseconfig';

import * as userActions from './modules/userModule';

class App extends Component {
  constructor(props) {
    super(props);

    //Initialize Firebase
    // firebase.initializeApp(config);

    this.loggedIn = props.loggedIn;
    this.notLoggedIn = props.notLoggedIn;
  }
  componentDidMount() {
    const self = this; // javascriptのthisを固定させるため
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        self.loggedIn(user);
      } else {
        self.notLoggedIn(user);
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
          {/* 全て仮に用意したものです */}
          {/* URLをブラウザに直打ちすると移動できます */}
          <Route exact path='/' render={() => <h1>Home</h1>} />
          <Route exact path='/login' component={Login} />
          <Route path='/client/:channel' component={ClientChannel} />
          <Route render={() => <p>ページが見つかりません</p>} />
        </Switch>
      </React.Fragment>
    );
  }
}

function ClientChannel() {
  const path = '/client';
  const { channel } = useParams(); // /client/:channelの:channelで指定した物が入る

  return (
    <Switch>
      <Route exact path={`${path}/${channel}`}>
        <Channel />
      </Route>
      <Route exact path={`${path}/${channel}/makeThread`}>
        <MakeThread />
      </Route>
      <Route path={`${path}/${channel}/:thread`}>
        <ClientThread />
      </Route>
      <Route render={() => <p>ページが見つかりませんん</p>} />
    </Switch>
  );
}

function ClientThread() {
  const { path } = useRouteMatch();
  const { thread } = useParams(); // /client/channel/:threadの:threadで指定した物が入る

  // :threadを取り除く
  const basePath = path
    .split('/')
    .slice(0, 3)
    .join('/');
  alert(basePath + thread);

  return (
    <switch>
      <Route exact path={`${basePath}/${thread}`}>
        <Thread />
      </Route>
      <Route render={() => <p>ページが見つかりませんんん</p>} />
    </switch>
  );
}

// redux関連
function mapDispatchToProps(dispatch) {
  return {
    loggedIn: user => dispatch(userActions.loggedIn(user)),
    notLoggedIn: () => dispatch(userActions.notLoggedIn())
  };
}
export default connect(
  null,
  mapDispatchToProps
)(App);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Route, Switch } from 'react-router-dom';

import Login from './containers/Login';
import Thread from './containers/Thread';
import MakeThread from './containers/MakeThread';
import Channel from './containers/Channel';

import firebase from 'firebase/app';
import 'firebase/auth';
import config from './config/firebaseconfig';

import * as userActions from './modules/userModule';

class App extends Component {
  constructor(props) {
    super(props);

    //Initialize Firebase
    firebase.initializeApp(config);

    this.loggedIn = props.loggedIn;
    this.notLoggedIn = props.notLoggedIn;
    this.uid = props.uid;
  }
  componentDidMount() {
    const self = this; // javascriptのthisを固定させるため
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        self.loggedIn(user);
      } else {
        self.notLoggedIn(user);
        // User is signed out.
        alert('Uid is none');
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
          <Route
            exact
            path='/client/testChannel'
            component={Channel}
            UserUid={this.uid}
          />
          <Route exact path='/login' component={Login} UserUid={this.uid} />
          <Route
            exact
            path='/client/testChannel/makeThread'
            component={MakeThread}
            UserUid={this.uid}
          />
          <Route
            exact
            path='/client/testChannel/testThread'
            component={Thread}
            UserUid={this.uid}
          />
          <Route render={() => <p>ページが見つかりません</p>} />
        </Switch>
      </React.Fragment>
    );
  }
}

// redux関連
function mapStateToProps(state) {
  return {
    uid: state.uid
  };
}
function mapDispatchToProps(dispatch) {
  return {
    loggedIn: user => dispatch(userActions.loggedIn(user)),
    notLoggedIn: () => dispatch(userActions.notLoggedIn())
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

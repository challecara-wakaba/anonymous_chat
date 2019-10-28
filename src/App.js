import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';

import Login from './containers/Login';
import Thread from './containers/Thread';
import MakeThread from './containers/MakeThread';
import Channel from './containers/Channel';

import firebase from 'firebase/app';
import 'firebase/auth';
import config from './config/firebaseconfig';

class App extends Component {
  constructor() {
    super();

    //Initialize Firebase
    firebase.initializeApp(config);

    this.uid = '';
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        // const displayName = user.displayName;
        // const email = user.email;
        // const emailVerified = user.emailVerified;
        // const photoURL = user.photoURL;
        // const isAnonymous = user.isAnonymous;
        this.uid = user.uid;
        // const providerData = user.providerData;
        // ...
      } else {
        this.uid = '';
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

export default App;

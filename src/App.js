import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';

import Login from './containers/Login';
import Thread from './containers/Thread';
import MakeThread from './containers/MakeThread';
import Channel from './containers/Channel';

import firebase from 'firebase/app';
import config from './config/firebaseconfig';

class App extends Component {
  constructor() {
    super();

    //Initialize Firebase
    firebase.initializeApp(config);
  }
  render() {
    return (
      <React.Fragment>
        {/* ルーティング */}
        <Switch>
          {/* 全て仮に用意したものです */}
          {/* URLをブラウザに直打ちすると移動できます */}
          <Route exact path='/' render={() => <h1>Home</h1>} />
          <Route exact path='/client/testChannel' component={Channel} />
          <Route exact path='/login' component={Login} />
          <Route
            exact
            path='/client/testChannel/makeThread'
            component={MakeThread}
          />
          <Route
            exact
            path='/client/testChannel/testThread'
            component={Thread}
          />
          <Route render={() => <p>ページが見つかりません</p>} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;

import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';

import Thread from './containers/Thread';
import MakeThreadForm from './components/MakeThreadForm';
import Channel from './containers/Channel';

import LoginForm from './components/LoginForm';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        {/* ルーティング */}
        <Switch>
          {/* 全て仮に用意したものです */}
          {/* URLをブラウザに直打ちすると移動できます */}
          <Route exact path='/' render={() => <h1>Home</h1>} />
          <Route exact path='/client/testChannel' component={Channel} />
          <Route exact path='/login' component={LoginForm} />
          <Route
            exact
            path='/client/testChannel/makeThreadForm'
            component={MakeThreadForm}
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

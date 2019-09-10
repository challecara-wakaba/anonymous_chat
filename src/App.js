import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        {/* ルーティング */}
        <Switch>
          {/* 全て仮に用意したものです */}
          {/* URLをブラウザに直打ちすると移動できます */}
          <Route exact path='/' render={() => <h1>Home</h1>} />
          <Route exact path='/login' render={() => <h1>Login</h1>} />
          <Route
            exact
            path='/client/testChannel'
            render={() => <h1>testChannel</h1>}
          />
          <Route
            exact
            path='/client/testChannel/testThread'
            render={() => <h1>testThread</h1>}
          />
          <Route render={() => <p>ページが見つかりません</p>} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;

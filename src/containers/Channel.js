import React from 'react';
import { connect } from 'react-redux';

import ThreadCardList from '../components/ThreadCardList';
import ThreadAddButton from '../components/ThreadAddButton';

function Channel(props) {
  const { threads } = props;

  return (
    <React.Fragment>
      <ThreadCardList threads={threads} />
      <ThreadAddButton />
    </React.Fragment>
  );
}

function mapStateToProps(state) {
  return {
    threads: state.channel.threads
  };
}

export default connect(mapStateToProps)(Channel);

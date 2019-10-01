import React from 'react';
import { connect } from 'react-redux';

import ThreadCardList from '../components/ThreadCardList';

function Channel(props) {
  const { threads } = props;
  return <ThreadCardList threads={threads} />;
}

function mapStateToProps(state) {
  return {
    threads: state.channel.threads
  };
}

export default connect(mapStateToProps)(Channel);

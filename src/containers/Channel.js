import React from 'react';
import { connect } from 'react-redux';

import ThreadCardList from '../components/ThreadCardList';
import * as channelActions from '../modules/channelModule';

function Channel(props) {
  const { threads } = props;
  return <ThreadCardList threads={threads} />;
}

function mapStateToProps(state) {
  return {
    threads: state.channel.threads
  };
}
function mapDispatchToProps(dispatch) {
  return {
    addThread: (title, details, pictureURL) =>
      dispatch(channelActions.addThread(title, details, pictureURL))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channel);

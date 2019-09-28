import React from 'react';
import { connect } from 'react-redux';

import ThreadOverview from '../components/ThreadOverview';
function Channel(props) {
  const { threads } = props;
  return (
    <ThreadOverview
      key={threads[0].id}
      title={threads[0].title}
      details={threads[0].details}
      pictureURL={threads[0].pictureURL}
    />
  );
}

function mapStateToProps(state) {
  return {
    threads: state.channel.threads
  };
}

export default connect(mapStateToProps)(Channel);

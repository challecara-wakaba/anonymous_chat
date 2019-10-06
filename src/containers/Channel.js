import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ThreadCardList from '../components/ThreadCardList';
import ThreadAddButton from '../components/ThreadAddButton';

function Channel(props) {
  const { threads } = props;
  const { url } = props.match;

  return (
    <React.Fragment>
      <ThreadCardList threads={threads} />
      <Link to={`${url}/makeThread`}>
        <ThreadAddButton />
      </Link>
    </React.Fragment>
  );
}

function mapStateToProps(state) {
  return {
    threads: state.channel.threads
  };
}

export default connect(mapStateToProps)(Channel);

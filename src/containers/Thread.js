import React from 'react';
import { connect } from 'react-redux';

import MessageList from '../components/MessageList';
import ThreadFooter from '../components/ThreadFooter';
import * as threadActions from '../modules/threadModule';

const Thread = props => {
  const userName = 'annin'; // これはテストです

  const { replies, addMessage } = props;

  const handleSubmit = text => {
    addMessage(userName, text);
  };

  return (
    <React.Fragment>
      <MessageList replies={replies} />
      <ThreadFooter onSubmit={handleSubmit} />
    </React.Fragment>
  );
};

// redux関連
const mapStateToProps = state => {
  return {
    replies: state.thread.replies
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addMessage: (name, text) => dispatch(threadActions.addMessage(name, text))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Thread);

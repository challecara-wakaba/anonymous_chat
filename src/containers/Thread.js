import React from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';
import MessageList from '../components/MessageList';
import ThreadFooter from '../components/ThreadFooter';
import * as threadActions from '../modules/threadModule';

const listSytle = {
  // VirtuosoはmakeStyleで高さと幅指定ができないためオブジェクトを作り
  // propsで渡しinlineCSSで適応させる
  marginTop: 64,
  height: document.documentElement.clientHeight - 64 - 64, //headerとfooterの高さ分引く
  width: '100%'
};

const Thread = props => {
  const userName = 'annin'; // これはテストです

  const { replies, addMessage } = props;

  const handleSubmit = text => {
    addMessage(userName, text);
  };

  return (
    <React.Fragment>
      <Header />
      <MessageList listStyle={listSytle} replies={replies} />
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

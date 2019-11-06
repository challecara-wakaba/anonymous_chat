import React from 'react';
import { connect } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import Header from '../components/Header';
import MessageList from '../components/MessageList';
import ThreadFooter from '../components/ThreadFooter';
import * as threadActions from '../modules/threadModule';
import changeUpperDirectory from '../functions/changeUpperDirectory';

const listSytle = {
  // VirtuosoはmakeStyleで高さと幅指定ができないためオブジェクトを作り
  // propsで渡しinlineCSSで適応させる
  marginTop: 64,
  height: document.documentElement.clientHeight - 64 - 64, //headerとfooterの高さ分引く
  width: '100%'
};

const Thread = props => {
  const { user, post, replies, addMessage } = props;
  const { url } = useRouteMatch();

  const handleHeadLeftButtonClick = () => {
    // チャンネル画面に戻る
    // sendButtonのpropsにhistoryが渡されている
    props.history.push(changeUpperDirectory(url));
  };

  const handleSubmit = text => {
    addMessage(user.uid, text);
  };

  return (
    <React.Fragment>
      <Header
        location='thread'
        onLeftButtonClick={handleHeadLeftButtonClick}
        label={post.title}
      />
      <MessageList listStyle={listSytle} post={post} replies={replies} />
      <ThreadFooter onSubmit={handleSubmit} />
    </React.Fragment>
  );
};

// redux関連
const mapStateToProps = state => {
  return {
    post: state.thread.post,
    replies: state.thread.replies,
    user: state.user.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addMessage: (userUid, text) =>
      dispatch(threadActions.addMessage(userUid, text))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Thread);

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useRouteMatch } from 'react-router-dom';

import Header from '../components/Header';
import MessageList from '../components/MessageList';
// import ThreadFooter from '../components/ThreadFooter';
import InputModal from '../components/InputModal';
import * as threadActions from '../modules/threadModule';
import changeUpperDirectory from '../functions/changeUpperDirectory';
//cloudfirestoreの初期化
import firebase from 'firebase';
var db = firebase.firestore();

const listSytle = {
  // VirtuosoはmakeStyleで高さと幅指定ができないためオブジェクトを作り
  // propsで渡しinlineCSSで適応させる
  marginTop: 56,
  height: document.documentElement.clientHeight - 64, //headerの高さ分引く
  width: '100%'
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.background,
    minHeight: '100vh'
  }
}));

const Thread = props => {
  const classes = useStyles();
  const { user, post, replies } = props;
  const { addMessage, loadMessage, goodButtonClick } = props;
  const { url } = useRouteMatch();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(
    () => {
      db.collection('message').onSnapshot(function(querySnapshot) {
        let replies = [];
        querySnapshot.forEach(function(doc) {
          replies.push(doc.data());
        });
        loadMessage(replies);
      });
      return () => {
        db.collection('message').onSnapshot(function() {});
      };
    },
    [] /*useEffectをcomponentDidMountのように扱うためにから配列を渡している*/
  );

  // --- modal window ---
  const handleModaleOpen = () => setIsOpen(true);
  const handleModaleClose = () => setIsOpen(false);
  const submit = text => {
    addMessage(user.uid, text.trim());
  };
  // --- --- --- ---

  // --- header ---
  const handleBuckButtonClick = () => {
    // チャンネル画面に戻る
    // sendButtonのpropsにhistoryが渡されている
    props.history.push(changeUpperDirectory(url));
  };
  // --- --- --- ---

  // --- Message ---
  const handleGoodClick = index => {
    // goodClickedUseersが無い時のため
    let goodClickedUsers = replies[index].goodClickedUsers
      ? replies[index].goodClickedUsers
      : {};

    if (goodClickedUsers[user.uid] === true) {
      // 押してあった時
      const newClickedUsers = Object.assign({}, goodClickedUsers, {
        [user.uid]: false
      });
      goodButtonClick(replies[index].id, newClickedUsers);
    } else {
      // 押してなかった時
      const newClickedUsers = Object.assign({}, goodClickedUsers, {
        [user.uid]: true
      });
      goodButtonClick(replies[index].id, newClickedUsers);
    }
  };
  // --- --- --- ---
  return (
    <div className={classes.root}>
      <Header
        location='thread'
        onBuckButtonClick={handleBuckButtonClick}
        onWriteButtonClick={handleModaleOpen}
        label={post.title}
      />
      <MessageList
        listStyle={listSytle}
        userUid={user.uid}
        post={post}
        replies={replies}
        onGoodClick={handleGoodClick}
      />
      {/* <ThreadFooter onSubmit={handleSubmit} /> */}
      <InputModal
        isOpen={isOpen}
        onClose={handleModaleClose}
        onSubmit={submit}
      />
    </div>
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
      dispatch(threadActions.addMessage(userUid, text)),
    loadMessage: replies => dispatch(threadActions.loadMessage(replies)),
    goodButtonClick: (docKey, goodClickedUsers) =>
      dispatch(threadActions.goodButtonClick(docKey, goodClickedUsers))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Thread);

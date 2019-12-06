import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useRouteMatch } from 'react-router-dom';
import Viewer from 'react-viewer/dist/index';

import Header from '../components/Header';
import MessageList from '../components/MessageList';
import InputModal from '../components/InputModal';
import * as threadActions from '../modules/threadModule';
import changeUpperDirectory from '../functions/changeUpperDirectory';
//cloudfirestoreの初期化
import firebase from 'firebase';
var db = firebase.firestore();

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.background
  },
  list: {
    marginTop: '56px'
  }
}));

const Thread = props => {
  const classes = useStyles();
  const { user, post, replies } = props;
  const { addMessage, loadMessage, goodButtonClick } = props;
  const { url } = useRouteMatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isvisiable, setIsVisiable] = useState(false);
  const [viweingPicture, setViewingPicture] = useState('');

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
  const handleModaleOpen = () => setIsModalOpen(true);
  const handleModaleClose = () => setIsModalOpen(false);
  const submit = text => {
    addMessage(user.uid, text.trim());
  };
  // --- --- --- ---

  // --- react-viewer ---
  const handleViewerOpen = pictureURL => {
    // react-viewerで表示するpictureのURLを設定
    setViewingPicture(pictureURL);
    // viewerを起動
    setIsVisiable(true);
  };
  const handleViewerClose = () => {
    setViewingPicture('');
    setIsVisiable(false);
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
      <div className={classes.list}>
        <MessageList
          userUid={user.uid}
          post={post}
          replies={replies}
          onGoodClick={handleGoodClick}
          onViewerOpen={handleViewerOpen}
        />
      </div>
      <InputModal
        isOpen={isModalOpen}
        onClose={handleModaleClose}
        onSubmit={submit}
      />
      <Viewer
        visible={isvisiable}
        drag={false}
        noToolbar={true}
        noFooter={true}
        onClose={handleViewerClose}
        images={[{ src: viweingPicture }]}
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
export default connect(mapStateToProps, mapDispatchToProps)(Thread);

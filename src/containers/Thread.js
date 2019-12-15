import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useRouteMatch } from 'react-router-dom';
import Viewer from 'react-viewer/dist/index';

import Header from '../components/Header';
import MessageList from '../components/Thread/MessageList';
import InputModal from '../components/Thread/InputModal';
import * as threadActions from '../modules/threadModule';
import changeUpperDirectory from '../functions/changeUpperDirectory';
//cloudfirestoreの初期化
import firebase from '../Firebase';
var db = firebase.firestore();

const useStyles = makeStyles(theme => ({
  list: {
    marginTop: '56px'
  }
}));

const Thread = props => {
  const classes = useStyles();
  const theme = useTheme();
  const { user, post, replies } = props;
  const {
    addMessage,
    loadMessage,
    goodButtonClick,
    KininaruButtonClick
  } = props;
  const { url } = useRouteMatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isvisiable, setIsVisiable] = useState(false);
  const [viweingPicture, setViewingPicture] = useState('');

  useEffect(
    () => {
      let unsbscribe = null;

      // スレッドのリスナーの設定
      const subscribe = async () => {
        // '/client/:channel/:thread'の:channelと:threadを取り出す
        const [channelId, threadId] = url.split('/').slice(-2);
        // urlで指定されたチャンネルのfirebase参照を取得
        const ref = db
          .collection('channels')
          .doc(channelId)
          .collection('threads')
          .doc(threadId);

        // 指定されたチャンネルが存在するか確認
        const isExist = (await ref.get()).exists;
        if (isExist) {
          // threadのメタデータを取得
          const threadMeta = (await ref.get()).data();

          // onSnapshotの返り値にunsbscribeする関数が返ってくる
          unsbscribe = ref.collection('messages').onSnapshot(querySnapshot => {
            // スレッドを取得してStoreに流す
            let messages = [];
            querySnapshot.forEach(doc => {
              messages.push(doc.data());
            });
            loadMessage(threadMeta, messages);
          });
        } else {
        }
      };
      subscribe();

      return function cleanUp() {
        // コンポーネントがunmountされる時に実行
        if (unsbscribe) unsbscribe();
        // Storeから今読み込んでいるものを消す
        loadMessage({}, []);
      };
    },
    [] /*useEffectをcomponentDidMountのように扱うためにから配列を渡している*/
  );

  // --- modal window ---
  const handleModaleOpen = () => setIsModalOpen(true);
  const handleModaleClose = () => setIsModalOpen(false);
  const submit = (text, picture) => {
    addMessage(url, user.uid, text.trim(), picture);
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
    // goodClickedUsersが無い時のため
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
  // --- Kininaru ---
  const handleKininaruClick = index => {
    // KininaruClickedUsersが無い時のため
    let KininaruClickedUsers = replies[index].KininaruClickedUsers
      ? replies[index].KininaruClickedUsers
      : {};

    if (KininaruClickedUsers[user.uid] === true) {
      // 押してあった時
      const newClickedUsers = Object.assign({}, KininaruClickedUsers, {
        [user.uid]: false
      });
      KininaruButtonClick(replies[index].id, newClickedUsers);
    } else {
      // 押してなかった時
      const newClickedUsers = Object.assign({}, KininaruClickedUsers, {
        [user.uid]: true
      });
      KininaruButtonClick(replies[index].id, newClickedUsers);
    }
  };
  // --- --- --- ---
  return (
    <div>
      <style>{`body {background-color: ${theme.background}}`}</style>
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
          onKininaruClick={handleKininaruClick}
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
    addMessage: (url, userUid, text, picture) =>
      dispatch(threadActions.addMessage(url, userUid, text, picture)),
    loadMessage: (post, replies) =>
      dispatch(threadActions.loadMessage(post, replies)),
    goodButtonClick: (docKey, goodClickedUsers) =>
      dispatch(threadActions.goodButtonClick(docKey, goodClickedUsers)),
    KininaruButtonClick: (docKey, KininaruClickedUsers) =>
      dispatch(threadActions.KininaruButtonClick(docKey, KininaruClickedUsers))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Thread);

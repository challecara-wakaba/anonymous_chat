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
import extractId from '../functions/extractId';
//cloudfirestoreの初期化
import firebase from '../Firebase';
import SkeltonMessage from '../components/Thread/SkeletonMessage';
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
  const { addMessage, loadPost, loadMessage, goodButtonClick } = props;
  const { url } = useRouteMatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isvisiable, setIsVisiable] = useState(false);
  const [viweingPicture, setViewingPicture] = useState('');
  const [isMessageUpdate, setIsMessageUpdate] = useState(false); // 「新しい投稿があります！」の表示に使う
  const [isSending, setIsSending] = useState(false); // 「投稿時のローディングに使う」

  const [isFetting, setIsFetting] = useState(false); // ローディングのスケルトンウィンドウを管理

  useEffect(
    () => {
      let metaUnsbscribe = null;
      let messagesUnsbscribe = null;

      // スケルトンウィンドウを表示
      setIsFetting(true);

      // スレッドのリスナーの設定
      const subscribe = async () => {
        // '/client/:channel/:thread'の:channelと:threadを取り出す
        const [channelId, threadId] = extractId(url);
        // urlで指定されたスレッドfirebase参照を取得
        const ref = db
          .collection('channels')
          .doc(channelId)
          .collection('threads')
          .doc(threadId);

        // 指定されたスレッドが存在するか確認
        const isExist = (await ref.get()).exists;
        if (isExist) {
          let threadMeta = null;
          // threadのメタデータを取得
          // onSnapshotの返り値にunsbscribeする関数が返ってくる
          metaUnsbscribe = ref.onSnapshot(
            {
              // ドキュメントのメタデータもリッスンする設定
              includeMetadataChanges: true
            },
            doc => {
              threadMeta = doc.data();
              loadPost(threadMeta);
            }
          );

          // onSnapshotの返り値にunsbscribeする関数が返ってくる
          messagesUnsbscribe = ref
            .collection('messages')
            .onSnapshot(querySnapshot => {
              // スレッドを取得してStoreに流す
              let messages = [];
              querySnapshot.forEach(doc => {
                messages.push(doc.data());
              });
              loadMessage(messages);
            });
        }

        // スケルトンウィンドウを非表示
        setIsFetting(false);
      };
      subscribe();

      return function cleanUp() {
        // コンポーネントがunmountされる時に実行
        if (metaUnsbscribe) metaUnsbscribe();
        if (messagesUnsbscribe) messagesUnsbscribe();
        // Storeから今読み込んでいるものを消す
        loadPost({});
        loadMessage([]);
      };
    },
    [] /*useEffectをcomponentDidMountのように扱うためにから配列を渡している*/
  );

  useEffect(() => {
    // messageの変更を取得する
    // 「新しいメッセージがあります！」などの表示や
    // 送信時のローディングアニメーションの表示に用いる

    let unsbscribe = null;
    const subscribe = async () => {
      // '/client/:channel/:thread'の:channelと:threadを取り出す
      const [channelId, threadId] = extractId(url);
      // urlで指定されたチャンネルのfirebase参照を取得
      const ref = db
        .collection('channels')
        .doc(channelId)
        .collection('threads')
        .doc(threadId);

      // 指定されたスレッドが存在するか確認
      const isExist = (await ref.get()).exists;
      if (isExist) {
        unsbscribe = ref.collection('messages').onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            let authorUid = change.doc.data().userUid;
            // 新しい投稿があり、投稿者ではなければ
            if (change.type === 'added' && authorUid !== user.uid) {
              setIsMessageUpdate(true); // メッセージを表示
            }
            // 新しい投稿があり、投稿者であれば
            if (change.type === 'added' && authorUid === user.uid) {
              setIsSending(false); // ローディングアニメーションをオフ
              setIsModalOpen(false); // モーダルウィンドウを閉じる
            }
          });
        });
      }
    };
    subscribe();

    return function cleanUp() {
      if (unsbscribe) unsbscribe();
    };
  }, []);

  // --- modal window ---
  const handleModaleOpen = () => {
    setIsModalOpen(true);
    setIsMessageUpdate(false);
    setIsSending(false);
  };
  const handleModaleClose = () => {
    setIsModalOpen(false);
    setIsMessageUpdate(false);
    setIsSending(false);
  };
  const submit = (text, picture, profile) => {
    addMessage(url, user.uid, text.trim(), picture, profile);
    setIsSending(true); // ローディングアニメーションをオン
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
      goodButtonClick(url, replies[index].id, newClickedUsers);
    } else {
      // 押してなかった時
      const newClickedUsers = Object.assign({}, goodClickedUsers, {
        [user.uid]: true
      });
      goodButtonClick(url, replies[index].id, newClickedUsers);
    }
  };
  // --- --- --- ---

  const makeDummyArray = count => {
    // firestoreからmessageを取得するまで表示するスケルトンウィンドウに用いる
    // この配列の値がリストのkeyになる
    let arr = [];
    for (let i = 0; i < count; ++i) {
      arr.push(i);
    }
    return arr;
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
        {isFetting ? (
          makeDummyArray(10).map(value => <SkeltonMessage key={value} />)
        ) : (
          <div>
            <MessageList
              userUid={user.uid}
              post={post}
              replies={replies}
              onGoodClick={handleGoodClick}
              onViewerOpen={handleViewerOpen}
              profile={post.profile}
            />
          </div>
        )}
      </div>
      <InputModal
        isOpen={isModalOpen}
        onClose={handleModaleClose}
        onSubmit={submit}
        userUid={user.uid}
        post={post}
        isMessageUpdate={isMessageUpdate}
        isSending={isSending}
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
    addMessage: (url, userUid, text, picture, profile) =>
      dispatch(threadActions.addMessage(url, userUid, text, picture, profile)),
    loadPost: post => dispatch(threadActions.loadPost(post)),
    loadMessage: replies => dispatch(threadActions.loadMessage(replies)),
    goodButtonClick: (url, messageKey, goodClickedUsers) =>
      dispatch(threadActions.goodButtonClick(url, messageKey, goodClickedUsers))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Thread);

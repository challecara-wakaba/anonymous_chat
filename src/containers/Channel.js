import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link, useRouteMatch } from 'react-router-dom';
import firebase from '../Firebase';

import Header from '../components/Header';
import SideMenu from '../components/Channel/SideMenu';
import ThreadCardList from '../components/Channel/ThreadCardList';
import ThreadAddButton from '../components/Channel/ThreadAddButton';
import SkeletonCard from '../components/Channel/SkeletonCard';
import * as channelActions from '../modules/channelModule';
import extractId from '../functions/extractId';

const db = firebase.firestore();

const useStyles = makeStyles(theme => ({
  list: {
    marginTop: '56px'
  }
}));

function Channel(props) {
  const { channels, threads, user } = props;
  const { loadChannel, loadThread, kininaruButtonClick } = props;
  const theme = useTheme();
  const classes = useStyles();
  const { url } = useRouteMatch();
  //サイドメニューのstateの設定
  const [state, setState] = React.useState({
    left: false
  });
  const [channelName, setChannelName] = React.useState('');
  const [isFetting, setIsFetting] = React.useState('false'); // ローディングのスケルトンウィンドウを管理

  useEffect(
    () => {
      // threadsのmetaのリスナーの設定

      let unsbscribe = null;

      // スケルトンウィンドウを表示
      setIsFetting(true);

      const subscribe = async () => {
        // '/client/:channel'の:channelを取り出す
        const [channelId] = extractId(url);
        // urlで指定されたチャンネルのfirebase参照を取得
        const ref = db.collection('channels').doc(channelId);

        // 指定されたチャンネルが存在するか確認
        const docSnapshot = await ref.get();
        const isExist = docSnapshot.exists;
        if (isExist) {
          // onSnapshotの返り値にunsbscribeする関数が返ってくる
          unsbscribe = ref
            .collection('threads')
            .orderBy('id', 'desc') // データを降順で並び替える
            .onSnapshot(querySnapshot => {
              // スレッドのメタデータをStoreに流す
              let threads = [];
              querySnapshot.forEach(doc => {
                threads.push(doc.data());
              });
              loadThread(threads);
            });
          setChannelName(`# ${docSnapshot.data().name}`); // ヘッダーに表示するチャンネル名を更新
        } else {
        }

        // スケルトンウィンドウを非表示
        setIsFetting(false);
      };
      subscribe();

      return function cleanUp() {
        // コンポーネントがunmountされる時に実行
        if (unsbscribe) unsbscribe();
        // Storeから今読み込んでいるものを消す
        loadThread([]);
      };
    },
    [url] /*URLが変わった時(チャンネルを切り替えた時実行する)*/
  );

  useEffect(() => {
    // チャンネル切り替えようのリスナーの設定

    let unsbscribe = null;
    const subscribe = async () => {
      // チャンネルがまとめられたコレクションのfirebase参照を所得
      const ref = db.collection('channels');

      // onSnapshotの返り値にunsbscribeする関数が返ってくる
      unsbscribe = ref.onSnapshot(querySnapshot => {
        // チャンネルのメタデータをStoreに流す
        let channels = [];
        querySnapshot.forEach(doc => {
          channels.push(doc.data());
        });
        loadChannel(channels);
      });
    };
    subscribe();

    return function cleanUp() {
      // コンポーネントがunmountされる時に実行
      if (unsbscribe) unsbscribe();
      // Storeから今読み込んでいるものを消す
      loadChannel([]);
    };
  }, []);

  //サイドメニューが開く
  const handletrue = () => setState({ left: true });
  //サイドメニューが閉じる
  const handlefalse = () => setState({ left: false });

  // kininaruButtonが押された時、フラグを逆にする
  const handleKininaruClick = threadId => {
    let kininaruClickedUsers = null;
    for (let item of threads) {
      if (item.id === threadId) {
        kininaruClickedUsers = item.kininaruClickedUsers;
      }
    }

    if (kininaruClickedUsers[user.uid] === true) {
      // 押してあった時
      const newClickedUsers = Object.assign({}, kininaruClickedUsers, {
        [user.uid]: false
      });
      kininaruButtonClick(url, threadId, newClickedUsers);
    } else {
      // 押してなかった時
      const newClickedUsers = Object.assign({}, kininaruClickedUsers, {
        [user.uid]: true
      });
      kininaruButtonClick(url, threadId, newClickedUsers);
    }
  };

  const makeDummyArray = count => {
    // firestoreからmessageを取得するまで表示するスケルトンウィンドウに用いる
    // この配列の値がリストのkeyになる
    let arr = [];
    for (let i = 0; i < count; ++i) {
      arr.push(i);
    }
    return arr;
  };

  return (
    <div>
      <style>{`body {background-color: ${theme.threadBackground}}`}</style>
      <Header
        location='channel'
        label={channelName}
        SideMenutrue={handletrue}
      />
      {/*stateを渡す*/}
      <SideMenu
        isOpen={state.left}
        SideMenutrue={handletrue}
        SideMenufalse={handlefalse}
        channels={channels}
      />
      <div className={classes.list}>
        {isFetting ? (
          makeDummyArray(10).map(value => <SkeletonCard key={value} />)
        ) : (
          <ThreadCardList
            threads={threads}
            onKininaruClick={handleKininaruClick}
            user={user}
          />
        )}
      </div>
      <Link to={`${url}/makeThread`}>
        <ThreadAddButton />
      </Link>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    channels: state.channel.channels,
    threads: state.channel.threads,
    user: state.user.user
  };
}
function mapDispatchToProps(dispatch) {
  return {
    loadChannel: channels => dispatch(channelActions.loadChannel(channels)),
    loadThread: threads => dispatch(channelActions.loadThread(threads)),
    kininaruButtonClick: (url, threadId, kininaruClickedUsers) =>
      dispatch(
        channelActions.kininaruButtonClick(url, threadId, kininaruClickedUsers)
      )
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Channel);

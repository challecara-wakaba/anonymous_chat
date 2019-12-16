import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link, useRouteMatch } from 'react-router-dom';
import firebase from '../Firebase';

import Header from '../components/Header';
import SideMenu from '../components/Channel/SideMenu';
import ThreadCardList from '../components/Channel/ThreadCardList';
import ThreadAddButton from '../components/Channel/ThreadAddButton';
import * as channelActions from '../modules/channelModule';
import extractId from '../functions/extractId';

const db = firebase.firestore();

const useStyles = makeStyles(theme => ({
  list: {
    marginTop: '56px'
  }
}));

const LABEL = '# 英語';
function Channel(props) {
  const { threads } = props;
  const { loadThread } = props;
  const theme = useTheme();
  const classes = useStyles();
  const { url } = useRouteMatch();
  //stateの設定
  const [state, setState] = React.useState({
    left: false
  });

  useEffect(() => {
    let unsbscribe = null;

    // threadsのmetaのリスナーの設定
    const subscribe = async () => {
      // '/client/:channel'の:channelを取り出す
      const [channelId] = extractId(url);
      // urlで指定されたチャンネルのfirebase参照を取得
      const ref = db.collection('channels').doc(channelId);

      // 指定されたチャンネルが存在するか確認
      const isExist = (await ref.get()).exists;
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
      } else {
      }
    };
    subscribe();

    return function cleanUp() {
      // コンポーネントがunmountされる時に実行
      if (unsbscribe) unsbscribe();
      // Storeから今読み込んでいるものを消す
      loadThread([]);
    };
  }, []);

  useEffect(() => {
    let unsbscribe = null;

    // チャンネル切り替えようのリスナーの設定
    const subscribe = async () => {
      // チャンネルがまとめられたコレクションのfirebase参照を所得
      const ref = db.collection('channels');

      // 指定されたチャンネルが存在するか確認
      const isExist = (await ref.get()).exists;
      if (isExist) {
        // onSnapshotの返り値にunsbscribeする関数が返ってくる
        unsbscribe = ref.onSnapshot(querySnapshot => {
          // チャンネルのメタデータをStoreに流す
          let channels = [];
          querySnapshot.forEach(doc => {
            threads.push(doc.data());
          });
          // loadChannel(channels);
        });
      } else {
      }
    };
    subscribe();

    return function cleanUp() {
      // コンポーネントがunmountされる時に実行
      if (unsbscribe) unsbscribe();
      // Storeから今読み込んでいるものを消す
      // loadChannel([]);
    };
  }, []);

  //サイドメニューが開く
  const handletrue = () => setState({ left: true });
  //サイドメニューが閉じる
  const handlefalse = () => setState({ left: false });
  return (
    <div>
      <style>{`body {background-color: ${theme.threadBackground}}`}</style>
      <Header location='channel' label={LABEL} SideMenutrue={handletrue} />
      {/*stateを渡す*/}
      <SideMenu
        isOpen={state.left}
        SideMenutrue={handletrue}
        SideMenufalse={handlefalse}
      />
      <div className={classes.list}>
        <ThreadCardList threads={threads} />
      </div>
      <Link to={`${url}/makeThread`}>
        <ThreadAddButton />
      </Link>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    threads: state.channel.threads
  };
}
function mapDispatchToProps(dispatch) {
  return {
    loadThread: threads => dispatch(channelActions.loadThread(threads))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Channel);

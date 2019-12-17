import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import firebase from '../Firebase';

import changeUpperDirectory from '../functions/changeUpperDirectory';
import extractId from '../functions/extractId';

import {
  TextFields,
  CancelButton,
  SendButton
} from '../components/MakeThread/MakeThreadForm';
import UploadPicButton from '../components/UploadPicButton';
import * as channelActions from '../modules/channelModule';

const db = firebase.firestore();

const useStyles = makeStyles(theme => ({
  bottomContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '48px 0',
    marginBottom: 'unset',
    paddingBottom: '48px'
  },
  root: {
    minHeight: '100vh'
  },
  tag: {
    margin: '16px',
    marginLeft: theme.spacing(3)
  },
  title: {
    margin: '36px'
  },
  preview: {
    objectFit: 'contain',
    height: '100px',
    width: '100px',
    marginLeft: '36px'
  },
  canncelButton: {
    marginLeft: '36px',
    textDecoration: 'none' // リンクの下線を消す
  },
  middleContainer: {
    display: 'flex',
    justifyContent: 'flex-start'
  }
}));

function MakeThread(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { url } = useRouteMatch();
  const { user } = props;
  const { addThread } = props;
  // TextFieldsに渡す
  const [channelName, setChannelName] = useState('');
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [isTitleFilled, setIsTitileFilled] = useState(true); // 訪問した最初にはエラーは出さない

  // UploadPicButtonに渡す
  const [picture, setPicture] = useState(null);
  const [blobURL, setBlobURL] = useState(null);

  useEffect(() => {
    // '/client/:channel'の:channelを取り出す
    const [channelId] = extractId(url);
    // urlで指定されたチャンネルのfirebase参照を取得
    const ref = db.collection('channels').doc(channelId);

    // 指定されたチャンネルが存在するか確認
    ref.get().then(docSnapshot => {
      // 表示するチャンネル名を更新
      setChannelName(docSnapshot.data().name);
    });
  }, []);

  function handleTextChange(event) {
    const targetName = event.target.name;
    const value = event.target.value;
    switch (targetName) {
      case 'title':
        setTitle(value);
        // 何か入力されていればerror表示を消す
        if (value.trim() !== '') {
          setIsTitileFilled(true);
        }
        return;
      case 'details':
        setDetails(value);
        return;
      default:
        return;
    }
  }

  function handlePictureChange(e) {
    e.preventDefault();

    // 選択したファイルを所得
    const file = e.target.files[0];
    // ファイルのブラウザ上でのURLを取得
    setBlobURL(window.URL.createObjectURL(file));
    // stateの更新
    setPicture(file);
  }

  function handleSubmit() {
    // タイトルの入力欄が空だったりホワイトスペースばっかりだったら送信しない
    // String.tirm() で文字列の銭湯と最後にある改行は空白を取り除
    if (title.trim() === '') {
      setIsTitileFilled(false);
      return;
    }
    addThread(url, user.uid, title.trim(), details.trim(), picture);

    // 所得したブラウザ上でのオブジェクトURLを開放
    window.URL.revokeObjectURL(blobURL);

    // 送信したらチャンネル画面に戻る
    // sendButtonのpropsにhistoryが渡されている
    props.history.push(changeUpperDirectory(url));
  }

  return (
    <div className={classes.root}>
      <style>{`body {background-color: ${theme.background}}`}</style>
      <Typography component='h1' variant='h4' className={classes.tag}>
        {`# ${channelName}`}
      </Typography>
      <TextFields
        title={title}
        details={details}
        isTitleFilled={isTitleFilled}
        onChange={handleTextChange}
      />
      <div className={classes.middleContainer}>
        <div style={{ margin: '4px 4px 4px 36px' }}>
          <UploadPicButton onChange={handlePictureChange} />
        </div>
        <p>一枚だけ追加できます</p>
      </div>
      {blobURL && <img src={blobURL} alt='' className={classes.preview} />}
      <div className={classes.bottomContainer}>
        <Link
          to={`${changeUpperDirectory(url)}`}
          className={classes.canncelButton}
        >
          <CancelButton />
        </Link>
        <div style={{ marginRight: '36px' }}>
          {/* SendButtonはLinkを用いずonClick時にhistory.pushを発火する */}
          <SendButton onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user.user
  };
}
function mapDispatchToProps(dispatch) {
  return {
    addThread: (url, userUid, title, details, picture) =>
      dispatch(channelActions.addThread(url, userUid, title, details, picture))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MakeThread);

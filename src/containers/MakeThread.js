import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import changeUpperDirectory from '../functions/changeUpperDirectory';

import {
  TextFields,
  CancelButton,
  SendButton
} from '../components/MakeThread/MakeThreadForm';
import UploadPicButton from '../components/UploadPicButton';
import * as channelActions from '../modules/channelModule';

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
  title: {
    margin: '12px 12px 12px 12px'
  },
  canncelButton: {
    marginLeft: '12px',
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
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [isTitleFilled, setIsTitileFilled] = useState(true); // 訪問した最初にはエラーは出さない

  // ImageButtonに渡す
  const [pictureURL /*setPictureURL*/] = useState('');

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

  function handleSubmit() {
    // タイトルの入力欄が空だったりホワイトスペースばっかりだったら送信しない
    // String.tirm() で文字列の銭湯と最後にある改行は空白を取り除
    if (title.trim() === '') {
      setIsTitileFilled(false);
      return;
    }
    addThread(url, user.uid, title.trim(), details.trim(), pictureURL);

    // 送信したらチャンネル画面に戻る
    // sendButtonのpropsにhistoryが渡されている
    props.history.push(changeUpperDirectory(url));
  }

  return (
    <div className={classes.root}>
      <style>{`body {background-color: ${theme.background}}`}</style>
      <Typography component='h1' variant='h3'>
        ＃testChannel
      </Typography>
      <TextFields
        title={title}
        details={details}
        isTitleFilled={isTitleFilled}
        onChange={handleTextChange}
      />
      <div className={classes.middleContainer}>
        <div style={{ margin: '4px 12px' }}>
          <UploadPicButton />
        </div>
        <p>一枚だけ追加できます</p>
      </div>
      <div className={classes.bottomContainer}>
        <Link
          to={`${changeUpperDirectory(url)}`}
          className={classes.canncelButton}
        >
          <CancelButton />
        </Link>
        <div style={{ marginRight: '12px' }}>
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
    addThread: (url, userUid, title, details, pictureURL) =>
      dispatch(
        channelActions.addThread(url, userUid, title, details, pictureURL)
      )
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MakeThread);

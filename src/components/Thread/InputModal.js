import React, { useState } from 'react';
import ReactModal from 'react-modal';
import UploadPicButton from '../UploadPicButton';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';
//アイコンの準備
import icons from '../../icon';

//メール通知用
import firebase from 'firebase';
require('firebase/functions');
const sendMail = firebase.functions().httpsCallable('sendMail');

const modalStyle = {
  overlay: {
    backgroundColor: '#808080',
    zIndex: 2
  },
  content: {
    position: 'static',
    margin: '12px',
    padding: '12px',
    height: '190px',
    backgroundColor: '#FFDEDD'
  }
};

const useStyles = makeStyles(theme => ({
  modalTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  newMessage: {
    color: theme.primary
  },
  Cancel: {
    paddingLeft: 'unset'
  },
  Button: {
    color: '#FFFFFF',
    backgroundColor: theme.secondary,
    margin: theme.spacing(1),
    marginRight: 'unset',
    padding: '4px 8px',
    '&:hover': {
      backgroundColor: theme.secondary
    }
  },
  Text: {
    color: theme.text
  },
  circle: {
    height: '16px',
    width: '16px'
  },
  Icon: {
    paddingLeft: theme.spacing(1),
    color: theme.text
  },
  Field: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.text
      },
      '&.Mui-focused fieldset': {
        borderColor: '#000000'
      }
    }
  },
  clickedModalBottom: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(2)
  },
  unclickedPicButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(2)
  },
  preview: {
    marginLeft: '21px',
    marginRight: 'auto',
    objectFit: 'contain',
    height: '40px',
    width: '70px'
  },
  TextBox: {
    borderColor: '#000000 !important'
  }
}));

ReactModal.setAppElement('#root');

export default function InputModal(props) {
  const classes = useStyles();
  const {
    isOpen,
    onClose,
    onSubmit,
    userUid,
    post,
    isMessageUpdate,
    isSending
  } = props;

  // modal
  const [writingText, setWritingText] = useState('');
  const [picture, setPicture] = useState(null);
  const [blobURL, setBlobURL] = useState(null); // 選択した画像のプレビュー用の変数

  const handleClose = () => {
    onClose();
    // 所得したブラウザ上でのオブジェクトURLを開放
    window.URL.revokeObjectURL(blobURL);
    //stateの開放
    setBlobURL(null);
    setPicture(null);
    setWritingText('');
  };

  const handleTextChange = e => {
    setWritingText(e.target.value);
  };

  const handlePictureChange = e => {
    e.preventDefault();

    // 選択したファイルを所得
    const file = e.target.files[0];

    // ファイルのブラウザ上でのURLを取得
    setBlobURL(window.URL.createObjectURL(file));

    // stateの更新
    setPicture(file);
  };

  const handleSubmit = () => {
    // 入力欄が空やホワイトスペースばっかりだったり、写真も選択していなかったら送信しない
    // String.tirm() で文字列の先頭と最後にある改行は空白を取り除く
    if (writingText.trim() === '' && picture === null) {
      return;
    }

    // まだアイコンが登録されていなければ
    const { profile, Shuffled } = post;
    if (!profile[userUid]) {
      const shuffledIndex = Object.keys(profile).length;
      profile[userUid] = icons[Shuffled[shuffledIndex]];
    }

    onSubmit(writingText.trim(), picture, profile); // ストアに接続してないため上のコンポーネントに渡す

    let sender = [];
    let a = 0;
    if (post.Emails) {
      for (let i = 0; i < Object.keys(post.Emails).length; i++) {
        if (Object.keys(post.Emails)[i]) {
          sender.push(Object.keys(post.Emails)[i]);
        }
      }
      for (let i = 0; i < sender.length; i++) {
        a += sender[i] + ',';
      }

      //メール送信
      sendMail({
        sousinsaki: a,
        naiyou: post.title + 'に新しいメッセージが来ています。'
      }).then(function(result) {});
    }

    // stateを初期化する
    setWritingText('');
    setPicture(null);

    // 所得したブラウザ上でのオブジェクトURLを開放
    window.URL.revokeObjectURL(blobURL);
    setBlobURL(null);
  };

  return (
    <React.Fragment>
      <ReactModal isOpen={isOpen} style={modalStyle}>
        <div className={classes.modalTop}>
          <IconButton onClick={handleClose} className={classes.Cancel}>
            <CloseIcon />
          </IconButton>
          {isOpen && isMessageUpdate && (
            <Typography variant='body2' className={classes.newMessage}>
              新しい投稿があります！
            </Typography>
          )}
          <Button className={classes.Button} onClick={handleSubmit}>
            {isOpen && isSending ? (
              <CircularProgress style={{ height: '16px', width: '16px' }} />
            ) : (
              <React.Fragment>
                <span className={classes.Text}>送信</span>
                <SendIcon className={classes.Icon} />
              </React.Fragment>
            )}
          </Button>
        </div>
        <TextField
          multiline
          rows='2'
          variant='outlined'
          value={writingText}
          className={classes.Field}
          onChange={handleTextChange}
        />
        {blobURL ? (
          <div className={classes.clickedModalBottom}>
            <img src={blobURL} alt='' className={classes.preview} />
            <UploadPicButton onChange={handlePictureChange} />
          </div>
        ) : (
          <div className={classes.unclickedPicButton}>
            <UploadPicButton onChange={handlePictureChange} />
          </div>
        )}
      </ReactModal>
    </React.Fragment>
  );
}

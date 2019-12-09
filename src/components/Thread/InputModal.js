import React, { useState } from 'react';
import ReactModal from 'react-modal';
import UploadPicButton from '../UploadPicButton';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';

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
    backgroundColor: '#FFDEDD',
    zIndex: 3
  }
};

const useStyles = makeStyles(theme => ({
  modalTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  Cancel: {
    paddingLeft: 'unset'
  },
  Button: {
    color: '#FFFFFF',
    backgroundColor: theme.secondary,
    margin: theme.spacing(1),
    marginRight: 'unset',
    padding: '4px 8px'
  },
  Icon: {
    paddingLeft: theme.spacing(1)
  },
  Field: {
    width: '100%',
    backgroundColor: '#FFFFFF'
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
  }
}));

ReactModal.setAppElement('#root');

export default function InputModal(props) {
  const classes = useStyles();
  const { isOpen, onClose, onSubmit } = props;

  // modal
  const [writingText, setWritingText] = useState('');
  const [picture, setPicture] = useState(null);
  const [blobURL, setBlobURL] = useState(null); // 選択した画像のプレビュー用の変数

  const handleClose = () => {
    onClose();
    setBlobURL(null);
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
    onSubmit(writingText.trim(), picture); // ストアに接続してないため上のコンポーネントに渡す

    // stateを初期化する
    setWritingText('');
    setPicture(null);
    // 所得したブラウザ上でのオブジェクトURLを開放
    window.URL.revokeObjectURL(blobURL);
  };

  return (
    <React.Fragment>
      <ReactModal isOpen={isOpen} style={modalStyle}>
        <div className={classes.modalTop}>
          <IconButton onClick={handleClose} className={classes.Cancel}>
            <CloseIcon />
          </IconButton>
          <Button
            variant='contined'
            className={classes.Button}
            onClick={handleSubmit}
          >
            送信
            <SendIcon className={classes.Icon} />
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

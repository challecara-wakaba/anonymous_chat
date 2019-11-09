import React, { useState, useRef } from 'react';
import ReactModal from 'react-modal';
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
    height: '180px',
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
  Button: {
    backgroundColor: theme.secondary,
    margin: theme.spacing(1)
  },
  Icon: {
    paddingLeft: theme.spacing(1)
  },
  Field: {
    width: 250
  },
  ImageButton: {
    color: '#FFFFFF',
    backgroundColor: '#000000',
    marginTop: theme.spacing(1)
  }
}));

ReactModal.setAppElement('#root');

export default function InputModal(props) {
  const classes = useStyles();
  const pickFile = useRef(null);
  const { isOpen, onClose, onSubmit } = props;

  // modal
  const [writingText, setWritingText] = useState('');

  const handleTextChange = e => {
    setWritingText(e.target.value);
  };

  const handleSubmit = () => {
    // 入力欄が空だったりホワイトスペースばっかりだったら送信しない
    // String.tirm() で文字列の銭湯と最後にある改行は空白を取り除く
    if (writingText.trim() === '') {
      return;
    }
    onSubmit(writingText.trim()); // ストアに接続してないため上のコンポーネントに渡す
    setWritingText('');
  };

  const handlePictureButtonClick = () => {
    pickFile.current.click();
  };

  return (
    <React.Fragment>
      <ReactModal isOpen={isOpen} style={modalStyle}>
        <div className={classes.modalTop}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
          <Button
            variant='contained'
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
        <input type='file' ref={pickFile} style={{ display: 'none' }} />
        <Button
          variant='contained'
          size='medium'
          className={classes.ImageButton}
          onClick={handlePictureButtonClick}
        >
          画像を追加
        </Button>
      </ReactModal>
    </React.Fragment>
  );
}

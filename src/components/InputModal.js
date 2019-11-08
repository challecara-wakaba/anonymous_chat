import React from 'react';
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
    height: '140px',
    zIndex: 3
  }
};

const useStyles = makeStyles(theme => ({
  modalTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}));

ReactModal.setAppElement('#root');
export default function InputModal(props) {
  const classes = useStyles();
  const { isOpen, onClose } = props;
  return (
    <React.Fragment>
      <ReactModal isOpen={isOpen} style={modalStyle}>
        <div className={classes.modalTop}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
          <Button>
            送信
            <SendIcon />
          </Button>
        </div>
        <TextField multiline rows='2' variant='outlined' />
      </ReactModal>
    </React.Fragment>
  );
}

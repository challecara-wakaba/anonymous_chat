import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Input from '@material-ui/core/Input';
// import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';

import Message from '../components/Message';
import * as messageModules from '../modules/message';

const useStyles = makeStyles(theme => ({
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing(8)
  },
  footer: {
    position: 'fixed',
    top: 'auto',
    bottom: 0,
    height: theme.spacing(8)
  },
  input: {
    flexGrow: 1
  }
}));

const Thread = props => {
  const userName = 'annin'; // これはテストです

  const classes = useStyles();
  const { replies, addMessage } = props;
  const [writingText, setWritingText] = useState('');

  const writingTextChange = e => {
    setWritingText(e.target.value);
  };

  const SendButtonClick = () => {
    // 入力欄が空だったりホワイトスペースばっかりだったら送信しない
    if (writingText.trim() === '') {
      return;
    }
    addMessage(userName, writingText);
    setWritingText('');
  };

  let messageEnd = null;
  const scrollBottom = () => {
    messageEnd.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() =>
    // render後などの処理など
    scrollBottom()
  );

  return (
    <React.Fragment>
      <List className={classes.list}>
        {replies.map(item => (
          <Message
            key={item.id}
            name={item.name}
            icon=''
            text={item.text}
            timeStamp={item.timeStamp}
          />
        ))}
      </List>
      <div
        // 自動スクロールのためのダミーdiv
        ref={el => {
          messageEnd = el;
        }}
      ></div>
      <AppBar className={classes.footer} color='primary'>
        <Toolbar disableGutters={true}>
          <IconButton color='inherit'>
            <PhotoLibraryIcon />
          </IconButton>
          <Input
            className={classes.input}
            multiline={true}
            rowsMax={3}
            value={writingText}
            placeholder='このスレッドに送信'
            onChange={writingTextChange}
          />
          <IconButton edge='start' color='inherit' onClick={SendButtonClick}>
            <SendIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

// redux関連
const mapStateToProps = state => {
  return {
    replies: state.message.replies
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addMessage: (name, text) => dispatch(messageModules.addMessage(name, text))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Thread);

import React, { useState, useEffect } from 'react';
import { animateScroll } from 'react-scroll';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';

const useStyle = makeStyles(theme => ({
  footerNormal: {
    position: 'fixed',
    top: 'auto',
    bottom: 0
  },
  footerAtFocus: {
    position: 'absolute',
    top: 'auto',
    bottom: 0
  },
  input: {
    flexGrow: 1
  }
}));

const ThreadFooter = props => {
  const classes = useStyle();
  const { onSubmit } = props;
  const [writingText, setWritingText] = useState('');
  const [isInputFocus, setIsInputFoucs] = useState(false);

  useEffect(() => {
    // スマホにおいて予測変換のポップアップで入力欄が塞がれないようにする
    animateScroll.scrollToBottom();
  });

  const handleTextChange = e => {
    setWritingText(e.target.value);
  };

  const handleSendButtonClick = () => {
    // 入力欄が空だったりホワイトスペースばっかりだったら送信しない
    // String.tirm() で文字列の銭湯と最後にある改行は空白を取り除く
    if (writingText.trim() === '') {
      return;
    }
    onSubmit(writingText.trim()); // ストアに接続してないため上のコンポーネントに渡す
    setWritingText('');
  };

  const changeToAbsolute = () =>
    // stateを変更するため再renderされる
    setIsInputFoucs(true);

  const changeToFixed = () =>
    // stateを変更するため再renderされる
    setIsInputFoucs(false);

  const toolbar = (
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
        onChange={handleTextChange}
        onFocus={changeToAbsolute}
        onBlur={changeToFixed}
      />
      <IconButton edge='start' color='inherit' onClick={handleSendButtonClick}>
        <SendIcon />
      </IconButton>
    </Toolbar>
  );
  return (
    // position: fixedでフッターを固定すると入力時にバグるため，
    // 入力時はposiiton: absoluteに変更する
    <React.Fragment>
      {isInputFocus ? (
        <AppBar className={classes.footerAtFocus} color='primary'>
          {toolbar}
        </AppBar>
      ) : (
        <AppBar className={classes.footerNormal} color='primary'>
          {toolbar}
        </AppBar>
      )}
    </React.Fragment>
  );
};

export default ThreadFooter;

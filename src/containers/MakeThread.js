import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import {
  TextFields,
  ImageButton,
  Checkboxs,
  CancelButton,
  SendButton
} from '../components/MakeThreadForm';
import * as channelActions from '../modules/channelModule';

const useStyles = makeStyles(theme => ({
  bottomContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '48px 0',
    padding: '0 16px'
  }
}));

function MakeThread(props) {
  const classes = useStyles();
  const { addThread } = props;
  // TextFieldsに渡す
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [isTitleFilled, setIsTitileFilled] = useState(true); // 訪問した最初にはエラーは出さない

  // ImageButtonに渡す
  const [pictureURL, setPictureURL] = useState('');

  // checkBoxに渡す
  const [isFirst, setIsFirst] = useState(false);
  const [isSecond, setIsSecond] = useState(false);
  const [isThird, setIsThird] = useState(false);
  const [isFourth, setIsFourth] = useState(false);
  const [isFifth, setIsFifth] = useState(false);
  const [isFastHalf, setIsFastHalf] = useState(false);
  const [isFastEnd, setIsFastEnd] = useState(false);
  const [isLateHalf, setIsLateHalf] = useState(false);
  const [isLateEnd, setIsLateEnd] = useState(false);

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

  function handleCheckChange(event) {
    const targetName = event.target.name;
    const checked = event.target.checked;
    switch (targetName) {
      case 'first':
        setIsFirst(checked);
        return;
      case 'second':
        setIsSecond(checked);
        return;
      case 'third':
        setIsThird(checked);
        return;
      case 'fourth':
        setIsFourth(checked);
        return;
      case 'fifth':
        setIsFifth(checked);
        return;
      case 'fastHalf':
        setIsFastHalf(checked);
        return;
      case 'fastEnd':
        setIsFastEnd(checked);
        return;
      case 'lateHalf':
        setIsLateHalf(checked);
        return;
      case 'lateEnd':
        setIsLateEnd(checked);
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
    addThread(title.trim(), details.trim(), pictureURL);
  }

  return (
    <React.Fragment>
      <TextFields
        title={title}
        details={details}
        isTitleFilled={isTitleFilled}
        onChange={handleTextChange}
      />
      <ImageButton />
      <Checkboxs
        isFirst={isFirst}
        isSecond={isSecond}
        isThird={isThird}
        isFourth={isFourth}
        isFifth={isFifth}
        isFastHalf={isFastHalf}
        isFastEnd={isFastEnd}
        isLateHalf={isLateHalf}
        isLateEnd={isLateEnd}
        onChange={handleCheckChange}
      />
      <div className={classes.bottomContainer}>
        <CancelButton />
        <SendButton onClick={handleSubmit} />
      </div>
    </React.Fragment>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    addThread: (title, details, pictureURL) =>
      dispatch(channelActions.addThread(title, details, pictureURL))
  };
}
export default connect(
  null,
  mapDispatchToProps
)(MakeThread);

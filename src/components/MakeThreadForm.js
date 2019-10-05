import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import SendIcon from '@material-ui/icons/Send';
const useStyles = makeStyles(theme => ({
  firstbox: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    padding: '0 8px'
  },
  secondbox: {
    display: 'flex',
    justifyContent: 'flex-start',
    padding: '16px 8px'
  },
  thirdbox: {
    margin: '0 8px',
    display: 'flex',
    alignItems: 'center'
  },
  forthbox: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(1),
    padding: '0 64px 64px 16px',
    backgroundColor: 'pink'
  },
  fifthbox: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '48px 0',
    padding: '0 16px'
  },
  firstLeft: {
    marginLeft: theme.spacing(11)
  },
  secondLeft: {
    marginLeft: theme.spacing(7)
  },
  thirdLeft: {
    marginLeft: theme.spacing(9)
  },
  forthLeft: {
    marginLeft: theme.spacing(2)
  },
  errorMessage: {
    color: 'red'
  }
}));

function TextFields(props) {
  const classes = useStyles();
  const { title, details, isTitleFilled, onChange } = props;

  return (
    <div className={classes.firstbox}>
      <TextField
        error={!isTitleFilled}
        id='outlined-required'
        label='題名（必須）'
        placeholder='過去問　[2]-(1) 力のモーメント'
        margin='normal'
        variant='outlined'
        name='title' // 入力をstateで管理するのに用いる
        value={title}
        onChange={onChange}
      />
      {!isTitleFilled && (
        <Typography className={classes.errorMessage} variant='body2'>
          この項目の入力は必須です
        </Typography>
      )}
      <TextField
        multiline
        id='outlined-multilined-static'
        label='質問内容'
        placeholder='(例)この問題の解き方がわかりません'
        rows='4'
        margin='normal'
        variant='outlined'
        name='details' // 入力をstataeで管理するのに用いる
        value={details}
        onChange={onChange}
      />
    </div>
  );
}

function ImageButton() {
  const classes = useStyles();

  return (
    <div className={classes.secondbox}>
      <Button variant='contained' size='medium' color='primary'>
        画像を追加
      </Button>
      <h5 className={classes.thirdbox}>1枚追加できます</h5>
    </div>
  );
}

function Checkbox(props) {
  const classes = useStyles();
  const {
    isFirst,
    isSecond,
    isThird,
    isFourth,
    isFifth,
    isFastHalf,
    isFastEnd,
    isLateHalf,
    isLateEnd,
    onChange
  } = props;

  return (
    <FormGroup required className={classes.forthbox}>
      <h2>タグを選択してください</h2>
      <FormControlLabel
        control={
          <CheckBox
            value='checkedA'
            color='primary'
            className={classes.firstLeft}
            name='first' // 入力をstataeで管理するのに用いる
            checked={isFirst}
            onChange={onChange}
          />
        }
        label='#１年'
        labelPlacement='start'
      />
      <FormControlLabel
        control={
          <CheckBox
            value='checkedA'
            color='primary'
            className={classes.firstLeft}
            name='second' // 入力をstataeで管理するのに用いる
            checked={isSecond}
            onChange={onChange}
          />
        }
        label='#２年'
        labelPlacement='start'
      />
      <FormControlLabel
        control={
          <CheckBox
            value='checkedB'
            color='primary'
            className={classes.firstLeft}
            name='third' // 入力をstataeで管理するのに用いる
            checked={isThird}
            onChange={onChange}
          />
        }
        label='#３年'
        labelPlacement='start'
      />
      <FormControlLabel
        control={
          <CheckBox
            value='checkedC'
            color='primary'
            className={classes.firstLeft}
            name='fourth' // 入力をstataeで管理するのに用いる
            checked={isFourth}
            onChange={onChange}
          />
        }
        label='#４年'
        labelPlacement='start'
      />
      <FormControlLabel
        control={
          <CheckBox
            value='checkedD'
            color='primary'
            className={classes.firstLeft}
            name='fifth' // 入力をstataeで管理するのに用いる
            checked={isFifth}
            onChange={onChange}
          />
        }
        label='#５年'
        labelPlacement='start'
      />
      <FormControlLabel
        control={
          <CheckBox
            value='checkedE'
            color='primary'
            className={classes.secondLeft}
            name='fastHalf' // 入力をstataeで管理するのに用いる
            fhecked={isFastHalf}
            onChange={onChange}
          />
        }
        label='#前期中間'
        labelPlacement='start'
      />
      <FormControlLabel
        control={
          <CheckBox
            value='checkedF'
            color='primary'
            className={classes.secondLeft}
            name='fastEnd' // 入力をstataeで管理するのに用いる
            checked={isFastEnd}
            onChange={onChange}
          />
        }
        label='#前期期末'
        labelPlacement='start'
      />
      <FormControlLabel
        control={
          <CheckBox
            value='checkedG'
            color='primary'
            className={classes.secondLeft}
            name='lateHalf' // 入力をstataeで管理するのに用いる
            checked={isLateHalf}
            onChange={onChange}
          />
        }
        label='#後期中間'
        labelPlacement='start'
      />
      <FormControlLabel
        control={
          <CheckBox
            value='checkedH'
            color='primary'
            className={classes.thirdLeft}
            name='lateEnd' // 入力をstataeで管理するのに用いる
            checked={isLateEnd}
            onChange={onChange}
          />
        }
        label='#年度末'
        labelPlacement='start'
      />
    </FormGroup>
  );
}

function OtherButtons(props) {
  const classes = useStyles();
  const { onSubmit } = props;
  return (
    <div className={classes.fifthbox}>
      <Button variant='contained' size='medium' color='secondary'>
        キャンセル
      </Button>
      <Button
        onClick={onSubmit}
        variant='contained'
        color='primary'
        className={classes.button}
      >
        送信
        <SendIcon className={classes.forthLeft}></SendIcon>
      </Button>
    </div>
  );
}

export default function MakeThreadForm(props) {
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
    <div>
      <TextFields
        title={title}
        details={details}
        isTitleFilled={isTitleFilled}
        onChange={handleTextChange}
      />
      <ImageButton />
      <Checkbox onChange={handleCheckChange} />
      <OtherButtons
        isFirst={isFirst}
        isSecond={isSecond}
        isThird={isThird}
        isFourth={isFourth}
        isFifth={isFifth}
        isFastHalf={isFastHalf}
        isFastEnd={isFastEnd}
        isLateHalf={isLateHalf}
        isLateEnd={isLateEnd}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

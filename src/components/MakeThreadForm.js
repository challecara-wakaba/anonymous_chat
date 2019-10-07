import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import SendIcon from '@material-ui/icons/Send';
const useStyles = makeStyles(theme => ({
  firstCont: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    margin: '0 8px'
  },
  secondCont: {
    display: 'flex',
    justifyContent: 'flex-start',
    margin: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  thirdCont: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(2)
  },
  forthCont: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(1),
    padding: theme.spacing(3),
    backgroundColor: 'pink'
  },
  Left: {
    marginLeft: theme.spacing(2)
  },
  errorMessage: {
    color: 'red'
  }
}));

export function TextFields(props) {
  const classes = useStyles();
  const { title, details, isTitleFilled, onChange } = props;

  return (
    <div className={classes.firstCont}>
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

export function ImageButton() {
  const classes = useStyles();

  return (
    <div className={classes.secondCont}>
      <Button variant='contained' size='medium' color='primary'>
        画像を追加
      </Button>
      <h5 className={classes.thirdCont}>1枚追加できます</h5>
    </div>
  );
}

export function Checkboxs(props) {
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
    <FormGroup className={classes.forthCont}>
      <h2>タグを選択してください</h2>
      <FormControlLabel
        control={
          <CheckBox
            value='checkedA'
            color='primary'
            className={classes.Margin}
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
            className={classes.Margin}
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
            className={classes.Margin}
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
            className={classes.Margin}
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
            className={classes.Margin}
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
            className={classes.Margin}
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
            className={classes.Margin}
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
            className={classes.Margin}
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
            className={classes.Margin}
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

export function CancelButton() {
  return (
    <Button variant='contained' size='medium' color='secondary'>
      キャンセル
    </Button>
  );
}

export function SendButton(props) {
  const classes = useStyles();
  const { onClick } = props;
  return (
    <Button onClick={onClick} variant='contained' size='medium' color='primary'>
      送信
      <SendIcon className={classes.Left}></SendIcon>
    </Button>
  );
}

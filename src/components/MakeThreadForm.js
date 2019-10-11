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
  FirstCont: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  SecondCont: {
    display: 'flex',
    justifyContent: 'flex-start'
  },
  ThirdCont: {
    display: 'inline-flex',
    flexDirection: 'column',
    margin: theme.spacing(1),
    marginRight: theme.spacing(3),
    padding: theme.spacing(2),
    backgroundColor: 'pink'
  },
  errorMessage: {
    color: 'red'
  },
  Field: {
    margin: theme.spacing(1)
  },
  Text: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(1)
  },
  Tag: {
    display: 'flex',
    flexDirection: 'row-reverse'
  },
  ClassBox: {
    marginLeft: theme.spacing(11)
  },
  ExamBox: {
    marginLeft: theme.spacing(7)
  },
  EndExamBox: {
    marginLeft: theme.spacing(9)
  },
  Left: {
    marginLeft: theme.spacing(2)
  }
}));

export function TextFields(props) {
  const classes = useStyles();
  const { title, details, isTitleFilled, onChange } = props;

  return (
    <div className={classes.FirstCont}>
      <TextField
        error={!isTitleFilled}
        id='outlined-required'
        label='題名（必須）'
        placeholder='過去問　[2]-(1) 力のモーメント'
        margin='normal'
        className={classes.Field}
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
        className={classes.Field}
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
    <div className={classes.SecondCont}>
      <Button
        variant='contained'
        size='medium'
        color='primary'
        className={classes.Text}
      >
        画像を追加
      </Button>
      <h5 className={classes.Text}>1枚追加できます</h5>
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
    <FormGroup className={classes.ThirdCont}>
      <h2>タグを選択してください</h2>
      <FormControlLabel
        className={classes.Tag}
        control={
          <CheckBox
            value='checkedA'
            color='primary'
            name='first' // 入力をstataeで管理するのに用いる
            checked={isFirst}
            onChange={onChange}
            className={classes.ClassBox}
          />
        }
        label='#１年'
      />
      <FormControlLabel
        className={classes.Tag}
        control={
          <CheckBox
            value='checkedB'
            color='primary'
            name='second' // 入力をstataeで管理するのに用いる
            checked={isSecond}
            onChange={onChange}
            className={classes.ClassBox}
          />
        }
        label='#２年'
      />
      <FormControlLabel
        className={classes.Tag}
        control={
          <CheckBox
            value='checkedC'
            color='primary'
            name='third' // 入力をstataeで管理するのに用いる
            checked={isThird}
            onChange={onChange}
            className={classes.ClassBox}
          />
        }
        label='#３年'
      />
      <FormControlLabel
        className={classes.Tag}
        control={
          <CheckBox
            value='checkedD'
            color='primary'
            name='fourth' // 入力をstataeで管理するのに用いる
            checked={isFourth}
            onChange={onChange}
            className={classes.ClassBox}
          />
        }
        label='#４年'
      />
      <FormControlLabel
        className={classes.Tag}
        control={
          <CheckBox
            value='checkedE'
            color='primary'
            name='fifth' // 入力をstataeで管理するのに用いる
            checked={isFifth}
            onChange={onChange}
            className={classes.ClassBox}
          />
        }
        label='#５年'
      />
      <FormControlLabel
        className={classes.Tag}
        control={
          <CheckBox
            value='checkedF'
            color='primary'
            name='fastHalf' // 入力をstataeで管理するのに用いる
            fhecked={isFastHalf}
            onChange={onChange}
            className={classes.ExamBox}
          />
        }
        label='#前期中間'
      />
      <FormControlLabel
        className={classes.Tag}
        control={
          <CheckBox
            value='checkedG'
            color='primary'
            name='fastEnd' // 入力をstataeで管理するのに用いる
            checked={isFastEnd}
            onChange={onChange}
            className={classes.ExamBox}
          />
        }
        label='#前期期末'
      />
      <FormControlLabel
        className={classes.Tag}
        control={
          <CheckBox
            value='checkedH'
            color='primary'
            name='lateHalf' // 入力をstataeで管理するのに用いる
            checked={isLateHalf}
            onChange={onChange}
            className={classes.ExamBox}
          />
        }
        label='#後期中間'
      />
      <FormControlLabel
        className={classes.Tag}
        control={
          <CheckBox
            value='checkedI'
            color='primary'
            name='lateEnd' // 入力をstataeで管理するのに用いる
            checked={isLateEnd}
            onChange={onChange}
            className={classes.EndExamBox}
          />
        }
        label='#年度末'
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

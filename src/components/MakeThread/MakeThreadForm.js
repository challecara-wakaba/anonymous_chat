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
    flexWrap: 'wrap',
    paddingTop: theme.spacing(1)
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
    backgroundColor: theme.threadBackground
  },
  errorMessage: {
    marginLeft: theme.spacing(1),
    color: theme.error
  },
  Margin: {
    margin: theme.spacing(1)
  },
  FieldText: {
    color: '#FFFFFF'
  },
  Tag: {
    display: 'flex',
    flexDirection: 'row-reverse'
  },
  ClassBox: {
    marginLeft: theme.spacing(15)
  },
  ExamBox: {
    marginLeft: theme.spacing(11)
  },
  EndExamBox: {
    marginLeft: theme.spacing(13)
  },
  AddButton: {
    display: 'flex',
    alignItems: 'center',
    margin: '12px 8px',
    backgroundColor: '#000000',
    '&:hover': {
      backgroundColor: '#000000'
    }
  },
  CancelButton: {
    marginRight: theme.spacing(3),
    backgroundColor: theme.secondary,
    '&:hover': {
      backgroundColor: theme.secondary
    }
  },
  SendButton: {
    marginRight: theme.spacing(3),
    backgroundColor: theme.primary,
    '&:hover': {
      backgroundColor: theme.primary
    }
  },
  PaperPlane: {
    marginLeft: theme.spacing(2),
    color: '#FFFFFF'
  },
  TextBox: {
    borderColor: '#000000 !important',
    color: '#000000 !important'
  }
}));

export function TextFields(props) {
  const classes = useStyles();
  const { title, details, isTitleFilled, onChange, onClick } = props;

  return (
    <div className={classes.FirstCont}>
      <h1 className={classes.Margin}>#物理</h1>
      <TextField
        error={!isTitleFilled}
        id='outlined-required'
        label='題名（必須）'
        placeholder='（例）過去問　[2]-(1) 力のモーメント'
        margin='normal'
        className={classes.Margin}
        variant='outlined'
        name='title' // 入力をstateで管理するのに用いる
        value={title}
        onChange={onChange}
        InputProps={{
          classes: {
            notchedOutline: classes.TextBox
          }
        }}
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
        className={classes.Margin}
        variant='outlined'
        name='details' // 入力をstataeで管理するのに用いる
        value={details}
        onChange={onChange}
        InputProps={{
          classes: {
            notchedOutline: classes.TextBox
          }
        }}
      />
    </div>
  );
}

export function ImageButton() {
  const classes = useStyles();

  return (
    <div className={classes.SecondCont}>
      <Button variant='contained' size='medium' className={classes.AddButton}>
        <span className={classes.FieldText}>画像を追加</span>
      </Button>
      <h5>1枚追加できます</h5>
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
            name='first' // 入力をstataeで管理するのに用いる
            checked={isFirst}
            onChange={onChange}
            className={classes.ClassBox}
            color='#000000'
          />
        }
        label='#１年'
      />
      <FormControlLabel
        className={classes.Tag}
        control={
          <CheckBox
            value='checkedB'
            name='second' // 入力をstataeで管理するのに用いる
            checked={isSecond}
            onChange={onChange}
            className={classes.ClassBox}
            color='#000000'
          />
        }
        label='#２年'
      />
      <FormControlLabel
        className={classes.Tag}
        control={
          <CheckBox
            value='checkedC'
            color='#000000'
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
            color='#000000'
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
            color='#000000'
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
            color='#000000'
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
            color='#000000'
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
            color='#000000'
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
            color='#000000'
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
  const classes = useStyles();
  return (
    <Button className={classes.CancelButton} variant='contained' size='medium'>
      <span className={classes.Fieldtext}>キャンセル</span>
    </Button>
  );
}

export function SendButton(props) {
  const classes = useStyles();
  const { onClick } = props;
  return (
    <Button
      onClick={onClick}
      className={classes.SendButton}
      variant='contained'
      size='medium'
    >
      <span className={classes.FieldText}>送信</span>
      <SendIcon className={classes.PaperPlane}></SendIcon>
    </Button>
  );
}

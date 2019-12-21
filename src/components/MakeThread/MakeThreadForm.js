import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SendIcon from '@material-ui/icons/Send';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  FirstCont: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    paddingTop: theme.spacing(1),
    marginLeft: 'auto'
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
    marginLeft: theme.spacing(5),
    color: theme.error
  },
  root: {
    margin: '6px 36px',
    '& label.Mui-focused': {
      color: '#000000'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.text
      },
      '&.Mui-focused fieldset': {
        borderColor: '#000000'
      }
    }
  },
  Text: {
    color: theme.text
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
    backgroundColor: theme.primary,
    '&:hover': {
      backgroundColor: theme.primary
    }
  },
  SendButton: {
    backgroundColor: theme.secondary,
    height: '36px',
    width: '103px',
    '&:hover': {
      backgroundColor: theme.secondary
    }
  },
  FieldText: {
    color: '#FFFFFF'
  },
  Text: {
    color: theme.text
  },
  PaperPlane: {
    marginLeft: theme.spacing(2),
    color: theme.text
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
        placeholder='（例）過去問　[2]-(1) 力のモーメント'
        margin='normal'
        className={classes.root}
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
        className={classes.root}
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
      <Button variant='contained' size='medium' className={classes.AddButton}>
        <span className={classes.FieldText}>画像を追加</span>
      </Button>
      <h5 className={classes.Text}>1枚追加できます</h5>
    </div>
  );
}

export function CancelButton() {
  const classes = useStyles();
  return (
    <Button className={classes.CancelButton} variant='contained' size='medium'>
      <span className={classes.FieldText}>キャンセル</span>
    </Button>
  );
}

export function SendButton(props) {
  const classes = useStyles();
  const { isSending } = props;
  const { onClick } = props;
  return (
    <Button
      onClick={onClick}
      className={classes.SendButton}
      variant='contained'
      size='medium'
    >
      {/* <span className={classes.FieldText}>送信</span>
      <SendIcon className={classes.PaperPlane}></SendIcon> */}
      {isSending ? (
        <CircularProgress style={{ height: '16px', width: '16px' }} />
      ) : (
        <React.Fragment>
          <span className={classes.FieldText}>送信</span>
          <SendIcon className={classes.PaperPlane}></SendIcon>
        </React.Fragment>
      )}
    </Button>
  );
}

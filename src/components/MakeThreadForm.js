import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column'
  },

  TextField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },

  IconLeft: {
    marginLeft: theme.spacing(1)
  }
}));

function TextFields() {
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate autoComplete='off'>
      <TextField
        required
        id='outlined-required'
        label='題名'
        placeholder='過去問　[2]-(1) 力のモーメント'
        className={classes.TextField}
        margin='normal'
        variant='outlined'
      />
      <TextField
        multiline
        id='outlined-multilined-static'
        label='質問内容'
        placeholder='(例)この問題の解き方がわかりません'
        rows='6'
        classname={classes.TextField}
        margin='normal'
        variant='outlined'
      />
    </form>
  );
}

function RegisterButton() {
  const classes = useStyles();

  return (
    <div>
      <Button variant='contained' color='primary' className={classes.button}>
        送信
        <SendIcon className={classes.IconLeft}></SendIcon>
      </Button>
    </div>
  );
}

function ImageButton() {
  const classes = useStyles();

  return (
    <div>
      <Button
        variant='contained'
        size='medium'
        color='primary'
        className={classes.margin}
      >
        画像を追加
      </Button>
    </div>
  );
}

export default function MakeThreadForm() {
  return (
    <div>
      <TextFields />
      <RegisterButton />
      <ImageButton />
    </div>
  );
}

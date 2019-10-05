import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import { mergeClasses } from '@material-ui/styles';
const useStyles = makeStyles(theme => ({
  Firstbox: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(8)
  },
  Weight: {
    fontWeight: 'lighter'
  },
  Secondbox: {
    display: 'flex',
    flexDirection: 'column',
    margin: '16px 88px 0 96px'
  },
  Firstmargin: {
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(7)
  }
}));

function TextFields() {
  const classes = useStyles();

  return (
    <form className={classes.Firstbox} noVaridate autoComplete='off'>
      <h1 className={classes.Weight}>ログインしてください</h1>
      <TextField
        id='outlined-email-input'
        label='Email'
        className={classes.Firstmargin}
        type='email'
        name='email'
        autoComplete='email'
        margin='normal'
        variant='outlined'
      />
      <TextField
        id='outlined-password-input'
        label='Password'
        className={classes.Firstmargin}
        type='password'
        autoComplete='current-password'
        margin='normal'
        variant='outlined'
      />
    </form>
  );
}

function Buttons() {
  const classes = useStyles();
  return (
    <div className={classes.Secondbox}>
      <Button variant='contained' color='secondary' size='large'>
        ログイン
      </Button>
      <Link href='#' variant='body2'>
        パスワードを忘れた！
      </Link>
    </div>
  );
}

export default function LoginForm() {
  return (
    <div>
      <TextFields />
      <Buttons />
    </div>
  );
}

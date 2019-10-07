import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
const useStyles = makeStyles(theme => ({
  Firstbox: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(4)
  },
  Title: {
    paddingLeft: theme.spacing(3),
    marginBottom: theme.spacing(6),
    fontWeight: 'lighter'
  },
  Span: {
    fontSize: '40px',
    color: '#FF0000'
  },
  Secondbox: {
    display: 'flex',
    flexDirection: 'column',
    margin: '16px 32px 0 32px'
  },
  Firstmargin: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(4)
  }
}));

function TextFields() {
  const classes = useStyles();

  return (
    <form className={classes.Firstbox} noVaridate autoComplete='off'>
      <h1 className={classes.Title}>
        <span className={classes.Span}>Lask</span>へようこそ
      </h1>
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

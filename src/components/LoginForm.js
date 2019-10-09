import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
const useStyles = makeStyles(theme => ({
  FirstCont: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: 'auto',
    margin: '40px 24px 0 24px'
  },
  SecondCont: {
    display: 'flex',
    flexDirection: 'column',
    margin: '32px 24px'
  },
  Title: {
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(5),
    fontWeight: 'lighter'
  },
  Span: {
    fontSize: theme.spacing(5),
    color: '#FF0000'
  },
  FirstMargin: {
    marginBottom: 'unset'
  },
  SecondMargin: {
    marginBottom: theme.spacing(1)
  }
}));

function TextFields() {
  const classes = useStyles();

  return (
    <form className={classes.FirstCont} noVaridate autoComplete='off'>
      <h1 className={classes.Title}>
        <span className={classes.Span}>Lask</span>へようこそ
      </h1>
      <TextField
        id='outlined-email-input'
        label='Email'
        type='email'
        name='email'
        className={classes.FirstMargin}
        autoComplete='email'
        margin='normal'
        variant='outlined'
      />
      <TextField
        id='outlined-password-input'
        label='Password'
        type='password'
        className={classes.FirstMargin}
        autoComplete='current-password'
        margin='normal'
        variant='outlined'
      />
    </form>
  );
}

function Buttons(props) {
  const classes = useStyles();
  const { onSubmit } = props;
  return (
    <div className={classes.SecondCont}>
      <Button
        variant='contained'
        color='secondary'
        size='large'
        className={classes.SecondMargin}
        onClick={onSubmit}
      >
        ログイン
      </Button>
      <Link href='#' variant='body2'>
        パスワードを忘れた！
      </Link>
    </div>
  );
}

export default function LoginForm(props) {
  const { onSubmit } = props;
  return (
    <div>
      <TextFields />
      <Buttons onSubmit={onSubmit} />
    </div>
  );
}

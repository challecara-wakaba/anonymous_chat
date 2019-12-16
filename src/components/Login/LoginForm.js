import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  FirstCont: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: 'auto',
    margin: '0 24px'
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
    color: theme.primary
  },
  Margin: {
    marginBottom: 'unset'
  },
  Button: {
    marginBottom: theme.spacing(1),
    backgroundColor: '#000000',
    '&:hover': {
      backgroundColor: '#000000'
    }
  },
  FieldText: {
    color: '#FFFFFF'
  },
  MesText: {
    color: theme.primary
  },
  normalBox: {
    color: '#000000'
  },
  errorMessage: {
    color: theme.error
  },
  TextLabel: {
    color: '#979797 !important'
  },
  TextBox: {
    borderColor: '#000000 !important'
  }
}));

export function TextFields(props) {
  const classes = useStyles();
  const {
    email,
    password,
    isUserFound,
    isCorrectPassword,
    onTextChange
  } = props;

  return (
    <form className={classes.FirstCont} noValidate autoComplete='off'>
      <h1 className={classes.Title}>
        <span className={classes.Span}>Lask</span>へようこそ
      </h1>
      <TextField
        label='Email'
        type='email'
        name='email' // onTextChangeで使う
        autoComplete='email'
        margin='normal'
        variant='outlined'
        error={!isUserFound} // tureの時赤枠にする
        value={email}
        onChange={onTextChange}
        InputLabelProps={{
          className: classes.TextLabel
        }}
        InputProps={{
          classes: {
            notchedOutline: classes.TextBox
          }
        }}
      />
      {!isUserFound && (
        <Typography className={classes.errorMessage} variant='body2'>
          メールアドレスが間違っているか、登録されていません。
        </Typography>
      )}
      <TextField
        id='outlined-password-input'
        label='Password'
        type='password'
        name='password' // onTextChangeで使う
        className={classes.Margin}
        autoComplete='current-password'
        margin='normal'
        variant='outlined'
        error={!isCorrectPassword} // tureの時赤枠にする
        value={password}
        onChange={onTextChange}
        InputLabelProps={{
          className: classes.TextLabel
        }}
        InputProps={{
          classes: {
            notchedOutline: classes.TextBox
          }
        }}
      />
      {!isCorrectPassword && (
        <Typography className={classes.errorMessage} variant='body2'>
          パスワードが間違っています
        </Typography>
      )}
    </form>
  );
}

export function Buttons(props) {
  const classes = useStyles();
  const { onSubmit } = props;
  return (
    <div className={classes.SecondCont}>
      <Button
        variant='contained'
        size='large'
        className={classes.Button}
        onClick={onSubmit}
      >
        <span className={classes.FieldText}>ログイン</span>
      </Button>
      <Link href='' variant='body2' className={classes.MesText}>
        パスワードを忘れた！
      </Link>
    </div>
  );
}

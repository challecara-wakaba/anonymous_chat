import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  Typography: {},
  button: {
    margin: theme.spacing(2)
  },
  textField: {
    margin: theme.spacing(2)
  },
  input: {
    display: 'none'
  }
}));

export default function SpacingGrid() {
  const classes = useStyles;

  return (
    <div>
      <Typography component='h1' variant='h5'>
        ログインしてください
      </Typography>
      <TextField
        id='outlined-email-input'
        label='Email' //実際に表示される名前
        className={classes.textField}
        type='email'
        name='email'
        autoComplete='email'
        margin='normal'
        variant='outlined'
      />
      <TextField
        id='outlined-password-input'
        label='Password'
        className={classes.textField}
        type='password'
        autoComplete='current-password'
        margin='normal'
        variant='outlined'
      />
      <Button
        variant='contained'
        color='secondary'
        size='large'
        className={classes.button}
      >
        ログイン
      </Button>
      <Link href='#' variant='body2'>
        パスワードを忘れた！
      </Link>
    </div>
  );
}

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { spacing } from '@material-ui/system';
const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  TextField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}));

export default function OutlinedTextField() {
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
        id='outline'
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

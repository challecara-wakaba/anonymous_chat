import React from 'react';
import clsx from 'clsx';
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
        Required
        id='outlined-required'
        label='Title'
        placeholder='(例)物理 過去問 [2]-(1)'
        className={classes.TextField}
        margin='normal'
        variant='outlined'
      />
    </form>
  );
}

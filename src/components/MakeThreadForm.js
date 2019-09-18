import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/input';
import { spacing } from '@material-ui/system';
const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  input: {
    margin: theme.spacing(1)
  }
}));
export default function Inputs() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Input
        placeholder='(例)物理 過去問 [2]-(1)'
        className={classes.input}
        inputProps={{
          'aria-label': 'description'
        }}
      />
    </div>
  );
}

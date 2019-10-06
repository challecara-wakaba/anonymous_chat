import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    right: theme.spacing(2),
    bottom: theme.spacing(2),
    height: 80,
    width: 80
  },
  label: {
    height: 60,
    width: 60
  }
}));

export default function ThreadAddButton(props) {
  const classes = useStyles();
  return (
    <Fab color='primary' aria-label='add' className={classes.root}>
      <AddIcon className={classes.label} />
    </Fab>
  );
}

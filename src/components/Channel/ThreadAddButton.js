import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    right: theme.spacing(2),
    bottom: theme.spacing(2),
    height: 56,
    width: 56,
    backgroundColor: '#000000',
    '&:hover': {
      backgroundColor: '#000000'
    }
  },
  label: {
    height: 42,
    width: 42
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

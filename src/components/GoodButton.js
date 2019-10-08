import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const useStyles = makeStyles(theme => ({
  ButtonCont: {
    height: theme.spacing(3),
    border: 'solid medium #FFB74C',
    padding: 'unset'
  },
  IconCont: {
    height: '18px'
  }
}));
export default function GoodButton() {
  const classes = useStyles();
  return (
    <Button className={classes.ButtonCont}>
      <ThumbUpIcon className={classes.IconCont} />
    </Button>
  );
}

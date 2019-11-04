import React from 'react';
import Button from '@material-ui/core/Button';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  ButtonCont: {
    display: 'inline-flex',
    border: 'solid thin #FF4500',
    height: '24px',
    minWidth: '48px',
    padding: 'unset',
    marginTop: '6px'
  },
  IconCont: {
    height: '18px',
    color: '#FF4500'
  }
};

const GoodButton = props => {
  const { classes } = props;
  return (
    <Button className={classes.ButtonCont}>
      <ThumbUpIcon className={classes.IconCont} />
    </Button>
  );
};

export default withStyles(styles)(GoodButton);

import React from 'react';
import Button from '@material-ui/core/Button';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
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
    height: '16px',
    color: '#FF4500',
    width: '20px'
  },
  goodCount: {
    color: '#FF4500'
  }
};

const GoodButton = props => {
  const { classes, goodCount } = props;
  return (
    <Button className={classes.ButtonCont}>
      <ThumbUpIcon className={classes.IconCont} />
      <Typography className={classes.goodCount}>{goodCount}</Typography>
    </Button>
  );
};

export default withStyles(styles)(GoodButton);

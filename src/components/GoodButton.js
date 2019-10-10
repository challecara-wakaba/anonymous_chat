import React from 'react';
import Button from '@material-ui/core/Button';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  ButtonCont: {
    display: 'inline-flex',
    border: 'solid medium #FFB74C',
    height: '24px',
    padding: 'unset',
    marginTop: '8px',
    '&:hover ': {
      backgroundColor: '#FFB74C'
    }
  },
  IconCont: {
    height: '18px'
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

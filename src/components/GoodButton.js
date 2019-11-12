import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';

const useStyle = makeStyles(theme => ({
  ButtonCont: ({ isGoodClicked }) => ({
    display: 'inline-flex',
    border: 'solid thin #95E8B8',
    backgroundColor: isGoodClicked ? '#95E8B8' : '#FFFFFF',
    height: '24px',
    minWidth: '48px',
    padding: 'unset',
    marginTop: '6px',
    '&:hover': {
      borderColor: '#95E8B8',
      backgroundColor: isGoodClicked ? '#95E8B8' : '#FFFFFF'
    }
  }),
  IconCont: ({ isGoodClicked }) => ({
    height: '16px',
    color: isGoodClicked ? '#FFFFFF' : '#95E8B8',
    width: '20px'
  }),
  goodCount: ({ isGoodClicked }) => ({
    color: isGoodClicked ? '#FFFFFF' : '#95E8B8'
  })
}));

const GoodButton = props => {
  const { isGoodClicked, goodCount, onClick } = props;
  const classes = useStyle({ isGoodClicked });
  return (
    <Button className={classes.ButtonCont} onClick={onClick}>
      <ThumbUpIcon className={classes.IconCont} />
      <Typography className={classes.goodCount}>{goodCount}</Typography>
    </Button>
  );
};

export default GoodButton;

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  label: {
    flexGrow: 1
  }
}));

export default function Header(props) {
  const classes = useStyles();
  const { location, onLeftButtonClick, label } = props;

  let leftButton, rightButton;
  switch (location) {
    case 'channel':
      leftButton = (
        <IconButton color='inherit' onClick={onLeftButtonClick}>
          <MenuIcon />
        </IconButton>
      );
      rightButton = (
        <IconButton color='inherit'>
          <SearchIcon />
        </IconButton>
      );
      break;
    case 'thread':
      leftButton = (
        <IconButton color='inherit' onClick={onLeftButtonClick}>
          <ArrowBackIosIcon />
        </IconButton>
      );
      rightButton = null;
      break;
    default:
      break;
  }

  return (
    <AppBar>
      <Toolbar>
        {leftButton}
        <Typography className={classes.label} variant='h6' color='inherit'>
          {label}
        </Typography>
        {rightButton}
      </Toolbar>
    </AppBar>
  );
}

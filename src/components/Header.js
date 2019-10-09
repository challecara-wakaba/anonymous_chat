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
      leftButton = <MenuIcon />;
      rightButton = <SearchIcon />;
      break;
    case 'thread':
      leftButton = <ArrowBackIosIcon />;
      rightButton = null;
      break;
    default:
      break;
  }

  return (
    <AppBar>
      <Toolbar>
        <IconButton edge='start' color='inherit' onClick={onLeftButtonClick}>
          {leftButton}
        </IconButton>
        <Typography className={classes.label} variant='h6' color='inherit'>
          {label}
        </Typography>
        <IconButton edge='end' color='inherit'>
          {rightButton}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

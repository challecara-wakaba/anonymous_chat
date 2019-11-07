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
  ToolBar: {
    backgroundColor: theme.primary
  },
  IconButton: {
    color: '#FFFFFF'
  },
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
      <Toolbar className={classes.ToolBar}>
        <IconButton
          edge='start'
          onClick={onLeftButtonClick}
          className={classes.IconButton}
        >
          {leftButton}
        </IconButton>
        <Typography className={classes.label} variant='h6'>
          {label}
        </Typography>
        <IconButton edge='end' className={classes.IconButton}>
          {rightButton}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

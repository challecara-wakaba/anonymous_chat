import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: 1
  },
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
  const {
    location,
    onSideButtonClick,
    onBuckButtonClick,
    onWriteButtonClick,
    label
  } = props;

  let leftButton, rightButton, onLeftClick, onRightClick;
  switch (location) {
    case 'channel':
      leftButton = <MenuIcon />;
      rightButton = <SearchIcon />;
      onLeftClick = onSideButtonClick;
      onRightClick = null;
      break;
    case 'thread':
      leftButton = <ArrowBackIosIcon />;
      rightButton = <EditIcon />;
      onLeftClick = onBuckButtonClick;
      onRightClick = onWriteButtonClick;
      break;
    default:
      break;
  }

  return (
    <AppBar className={classes.root}>
      <Toolbar className={classes.ToolBar}>
        <IconButton
          edge='start'
          onClick={onLeftClick}
          className={classes.IconButton}
        >
          {leftButton}
        </IconButton>
        <Typography className={classes.label} variant='h6'>
          {label}
        </Typography>
        <IconButton
          edge='end'
          className={classes.IconButton}
          onClick={onRightClick}
        >
          {rightButton}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  label: {
    flexGrow: 1
  }
}));

const LABEL = '過去問[2]-(1)';

export default function Header() {
  const classes = useStyles();
  return (
    <AppBar>
      <Toolbar>
        <IconButton color='inherit'>
          <ArrowBackIosIcon />
        </IconButton>
        <Typography className={classes.label} variant='h6' color='inherit'>
          {LABEL}
        </Typography>
        <IconButton color='inherit'>
          <SearchIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

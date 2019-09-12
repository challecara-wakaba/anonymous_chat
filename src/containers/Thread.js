import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
// import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';

import Message from '../components/Message';

const useStyles = makeStyles(theme => ({
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  footer: {
    position: 'fixed',
    top: 'auto',
    bottom: 0
  },
  input: {
    flexGrow: 1
  }
}));

const Thread = props => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <List className={classes.list}>
        {props.replies.map(item => (
          <Message key={item.id} name={item.name} icon='' text={item.text} />
        ))}
      </List>
      <AppBar className={classes.footer} color='primary'>
        <Toolbar>
          <IconButton color='inherit'>
            <PhotoLibraryIcon />
          </IconButton>
          <InputBase
            className={classes.input}
            placeholder='このスレッドに送信'
          />
          <IconButton edge='start' color='inherit'>
            <SendIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

// redux関連
const mapStateToProps = state => {
  return {
    replies: state.message.replies
  };
};
export default connect(mapStateToProps)(Thread);

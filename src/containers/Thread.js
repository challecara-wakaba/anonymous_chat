import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import Message from '../components/Message';
import ThreadFooter from '../components/ThreadFooter';
import * as messageModules from '../modules/message';

const useStyles = makeStyles(theme => ({
  list: {
    backgroundColor: theme.palette.background.paper
  }
}));

const Thread = props => {
  const userName = 'annin'; // これはテストです

  const classes = useStyles();
  const { replies, addMessage } = props;

  const handleDispatch = text => {
    addMessage(userName, text);
  };

  return (
    <React.Fragment>
      <List className={classes.list}>
        {replies.map(item => (
          <Message
            key={item.id}
            name={item.name}
            icon=''
            text={item.text}
            timeStamp={item.timeStamp}
          />
        ))}
      </List>
      <ThreadFooter onDispatch={handleDispatch} />
    </React.Fragment>
  );
};

// redux関連
const mapStateToProps = state => {
  return {
    replies: state.message.replies
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addMessage: (name, text) => dispatch(messageModules.addMessage(name, text))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Thread);

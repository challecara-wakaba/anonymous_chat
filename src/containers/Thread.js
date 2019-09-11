import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import Message from '../components/Message';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
}));

const Thread = props => {
  const classes = useStyles();
  const replies = props.replies.map(item => (
    <Message key={item.id} name={item.name} icon='' text={item.text} />
  ));
  return <List className={classes.root}>{replies}</List>;
};

// redux関連
const mapStateToProps = state => {
  return {
    replies: state.message.replies
  };
};
export default connect(mapStateToProps)(Thread);

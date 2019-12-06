import React from 'react';
import { connect } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link, useRouteMatch } from 'react-router-dom';

import Header from '../components/Header';
import ThreadCardList from '../components/ThreadCardList';
import ThreadAddButton from '../components/ThreadAddButton';

const useStyles = makeStyles(theme => ({
  list: {
    marginTop: '56px'
  }
}));

const LABEL = '# 英語';
function Channel(props) {
  const { threads } = props;
  const theme = useTheme();
  const classes = useStyles();
  const { url } = useRouteMatch();

  return (
    <div>
      <style>{`body {background-color: ${theme.threadBackground}}`}</style>
      <Header location='channel' label={LABEL} />
      <div className={classes.list}>
        <ThreadCardList threads={threads} />
      </div>
      <Link to={`${url}/makeThread`}>
        <ThreadAddButton />
      </Link>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    threads: state.channel.threads
  };
}

export default connect(mapStateToProps)(Channel);

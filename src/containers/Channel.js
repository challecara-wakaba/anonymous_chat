import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useRouteMatch } from 'react-router-dom';

import SideMenu from '../components/SideMenu';
import Header from '../components/Header';
import ThreadCardList from '../components/ThreadCardList';
import ThreadAddButton from '../components/ThreadAddButton';

const listStyle = {
  // VirtuosoはmakeStyleで高さと幅指定ができないためオブジェクトを作り
  // propsで渡しinlineCSSで適応させる
  marginTop: 56,
  height: document.documentElement.clientHeight - 64, //headerとfooterの高さ分引く
  width: '100%'
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.threadBackground,
    minHeight: '100vh'
  }
}));

const LABEL = '# 英語';
function Channel(props) {
  const { threads } = props;
  const classes = useStyles();
  const { url } = useRouteMatch();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const handleSideMenuOpen = () => setIsSideMenuOpen(true);
  const handleSideMenuClose = () => setIsSideMenuOpen(false);

  return (
    <div className={classes.root}>
      <Header
        location='channel'
        label={LABEL}
        onSideButtonClick={handleSideMenuOpen}
      />
      <SideMenu isOpen={isSideMenuOpen} onClose={handleSideMenuClose} />
      <ThreadCardList listStyle={listStyle} threads={threads} />
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

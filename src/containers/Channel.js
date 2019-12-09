import React from 'react';
import { connect } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link, useRouteMatch } from 'react-router-dom';

import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
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
  //stateの設定
  const [state, setState] = React.useState({
    left: false
  });
  //サイドメニューが開く
  const handletrue = () => setState({ left: true });
  //サイドメニューが閉じる
  const handlefalse = () => setState({ left: false });
  return (
    <div>
      <style>{`body {background-color: ${theme.threadBackground}}`}</style>
      <Header location='channel' label={LABEL} SideMenutrue={handletrue} />
      //stateを渡す
      <SideMenu
        isOpen={state.left}
        SideMenutrue={handletrue}
        SideMenufalse={handlefalse}
      />
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

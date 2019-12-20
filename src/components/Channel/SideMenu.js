import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import firebase from 'firebase/app';
import { Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import { Virtuoso } from 'react-virtuoso';
import extractId from '../../functions/extractId';
import LaskLogo from '../../images/LaskLogo.png';

import SideMenuItem from './SideMenuItem';

//サイドメニューのcss
const useStyles = makeStyles(theme => ({
  menuTop: {
    height: 140
  },
  logo: {
    objectFit: 'contain',
    height: 72,
    position: 'relative',
    top: 16,
    left: 8
  },
  listPaper: {
    backgroundColor: theme.background,
    width: 250
  },
  listTitle: {
    color: theme.text,
    marginLeft: '12px'
  },
  button: {
    width: '42%',
    color: '#FF5F58',
    backgroundColor: '#F7F3EF',
    fontSize: '14px',
    position: 'relative',
    top: '6%',
    left: '52%',
    border: 'solid thin #FF5F58',
    borderRadius: 'unset',
    padding: '6px 8px'
  }
}));
const listStyle = {
  // heightは、これだとうまくいった、なんでかはわからない
  height: 'calc(100vh - 140px - 40px - 100px)',
  width: '100%'
};

//サイドメニュー本体部分
export default function SideMenu(props) {
  const classes = useStyles();
  const { url } = useRouteMatch();
  const isOpen = props.isOpen;
  const channels = props.channels;
  const SideMenutrue = props.SideMenutrue;
  const SideMenufalse = props.SideMenufalse;

  // channelIdを取得
  const [channelId] = extractId(url);

  const signout = () => event => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        alert('Sign-out successful.');
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  //メニューの中身をdivタグに書く
  const Menu = (
    <React.Fragment>
      <div className={classes.menuTop}>
        <img src={LaskLogo} alt='LaskLogo' className={classes.logo} />
      </div>
      <Typography variant='subtitle2' className={classes.listTitle}>
        チャンネル
      </Typography>
      <nav>
        <List>
          <Virtuoso
            totalCount={channels.length}
            style={listStyle}
            overscan={200}
            computeItemKey={i => channels[i].id}
            item={i => (
              <SideMenuItem
                id={channels[i].id}
                isSelected={channels[i].id === channelId}
                name={channels[i].name}
              />
            )}
          />
        </List>
      </nav>
      <Button onClick={signout()} className={classes.button}>
        Logout
      </Button>
    </React.Fragment>
  );
  //描画
  return (
    <div>
      <SwipeableDrawer
        classes={{
          root: classes.list,
          paper: classes.listPaper
        }}
        open={isOpen}
        onClose={SideMenufalse}
        onOpen={SideMenutrue}
      >
        {Menu}
      </SwipeableDrawer>
    </div>
  );
}

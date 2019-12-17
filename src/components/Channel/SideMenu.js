import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import firebase from 'firebase/app';
import { Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
//サイドメニューのcss
const useStyles = makeStyles(theme => ({
  tmp: {
    // 本当はロゴが入るスペース
    marginTop: '140px'
  },
  listPaper: {
    backgroundColor: theme.background,
    width: 250
  },
  titleText: {
    color: theme.text,
    marginLeft: '10px'
  },
  itemText: {
    color: theme.text
  },
  button: {
    width: '100%',
    color: '#FF5F58',
    backgroundColor: '#F7F3EF',
    fontSize: '16px',
    position: 'relative',
    top: '6%'
  }
}));
//サイドメニュー本体部分
export default function SideMenu(props) {
  const classes = useStyles();
  const isOpen = props.isOpen;
  const channels = props.channels;
  const SideMenutrue = props.SideMenutrue;
  const SideMenufalse = props.SideMenufalse;
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
    <div className={classes.tmp}>
      <Typography variant='subtitle2' className={classes.titleText}>
        チャンネル
      </Typography>
      <nav>
        <List>
          {channels.map(item => (
            <ListItem key={item.id} button component='li'>
              <Typography variant='body1' className={classes.itemText}>
                {`# ${item.name}`}
              </Typography>
            </ListItem>
          ))}
        </List>
      </nav>
      <Button onClick={signout()} className={classes.button}>
        Logout
      </Button>
    </div>
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

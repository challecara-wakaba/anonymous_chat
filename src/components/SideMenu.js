import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
//サイドメニューのcss
const useStyles = makeStyles({
  list: {
    width: 250
  }
});
//サイドメニュー本体部分
export default function SideMenu(props) {
  const classes = useStyles();
  const isOpen = props.isOpen;
  const SideMenutrue = props.SideMenutrue;
  const SideMenufalse = props.SideMenufalse;
  //メニューの中身をdivタグに書く
  const Menu = <div className={classes.list}></div>;
  //描画
  return (
    <div>
      <SwipeableDrawer
        open={isOpen}
        onClose={SideMenufalse}
        onOpen={SideMenutrue}
      >
        {Menu}
      </SwipeableDrawer>
    </div>
  );
}

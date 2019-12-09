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
export default function SideMenu() {
  const classes = useStyles();
  //stateの設定
  const [state, setState] = React.useState({
    left: false
  });
  //サイドメニューのstateを切り替える関数
  const toggleDrawer = open => event => {
    setState({ left: open });
  };
  //メニューの中身をdivタグに書く
  const Menu = <div className={classes.list}></div>;
  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Open Left</Button>
      <SwipeableDrawer
        open={state.left}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {Menu}
      </SwipeableDrawer>
    </div>
  );
}

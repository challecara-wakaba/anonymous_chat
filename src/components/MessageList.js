import React from 'react';
import { Virtuoso } from 'react-virtuoso';
import { makeStyles } from '@material-ui/core/styles';

import Message from './Message';

// リストのサイズを動的に変更するとバグるため，最初に決定しておく
const THEMESPACING = 8; // 初期せってがtheme.spacing == 8px のため
const LISTHEIGHT = document.documentElement.clientHeight - THEMESPACING * 8; //　フッター分高さをマイナス

const useStyles = makeStyles(theme => ({
  root: {
    height: LISTHEIGHT,
    width: '100%'
  }
}));

export default function MessageList(props) {
  const classes = useStyles();
  const { replies } = props;

  function generateItem(index) {
    return (
      <Message
        name={replies[index].name}
        icon=''
        text={replies[index].text}
        timeStamp={replies[index].timeStamp}
      />
    );
  }

  return (
    <Virtuoso
      className={classes.root}
      totalCount={replies.length}
      computeItemKey={index => replies[index].id}
      item={generateItem}
    />
  );
}

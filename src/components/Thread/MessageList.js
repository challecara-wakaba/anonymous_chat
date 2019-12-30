import React from 'react';
import { List } from '@material-ui/core';

import Message from './Message';
import FirstPost from './FirstPost';
import icons from '../../icon';

export default function MessageList(props) {
  const { post, replies, userUid } = props;
  const { onGoodClick, onViewerOpen } = props;

  //名前を抽出する関数
  //%の位置と?の位置の間を抽出して16進数を日本語に変換し、配列namesに代入
  const assignname = str => {
    if (!str) return '';
    let percent = 0,
      hatena = 0,
      decoded;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === '%' && percent === 0) percent = i;
      if (str[i] === '?' && hatena === 0) hatena = i;
      decoded = str.substring(percent + 3, hatena - 4);
    }
    percent = 0;
    hatena = 0;
    return decodeURI(decoded);
  };

  const postDOM = Object.keys(post).length !== 0 && (
    <FirstPost
      key={post.id}
      name={assignname(icons[post.Shuffled[0]])}
      details={post.details}
      timeStamp={post.timeStamp}
      pictureURL={post.pictureURL}
      iconURL={icons[post.Shuffled[0]]}
      onViewerOpen={onViewerOpen}
    />
  );

  const replyDOMs = replies.map((item, index) => {
    // goodClickedUseersが無い時のため
    let goodClickedUsers = item.goodClickedUsers ? item.goodClickedUsers : {};
    // goodButtonが押された数を判断する処理
    let goodCount = 0;
    for (let i of Object.values(goodClickedUsers)) {
      if (i === true) ++goodCount;
    }
    // goodButtonを押したか判断する処理
    let isGoodClicked = false;
    if (goodClickedUsers[userUid] === true) {
      // 押していた時
      isGoodClicked = true;
    } else {
      // 押していなかった時
      isGoodClicked = false;
    }

    return (
      <Message
        key={item.id}
        name={assignname(post.profile[item.userUid])}
        icon={post.profile[item.userUid]}
        text={item.text}
        pictureURL={item.pictureURL}
        timeStamp={item.timeStamp}
        onViewerOpen={onViewerOpen}
        //GoodButtonのprops
        isGoodClicked={isGoodClicked}
        goodCount={goodCount}
        onGoodClick={() => onGoodClick(index)}
      />
    );
  });

  return (
    <List>
      {postDOM}
      {replyDOMs}
    </List>
  );
}

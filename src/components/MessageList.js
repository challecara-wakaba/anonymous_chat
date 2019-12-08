import React from 'react';
import { List } from '@material-ui/core';

import Message from './Message';
import FirstPost from './FirstPost';

export default function MessageList(props) {
  const { post, replies, userUid } = props;
  const { onGoodClick, onViewerOpen } = props;

  return (
    <List>
      <FirstPost
        key={post.id}
        name={post.name}
        details={post.details}
        timeStamp={post.timeStamp}
        pictureURL={post.pictureURL}
        onViewerOpen={onViewerOpen}
      />
      {replies.map((item, index) => {
        // goodClickedUseersが無い時のため
        let goodClickedUsers = item.goodClickedUsers
          ? item.goodClickedUsers
          : {};
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
            name=''
            icon=''
            text={item.text}
            pictureURL={item.pictureURL}
            timeStamp={item.timeStamp}
            isGoodClicked={isGoodClicked}
            goodCount={goodCount}
            onGoodClick={() => onGoodClick(index)}
            onViewerOpen={onViewerOpen}
          />
        );
      })}
    </List>
  );
}

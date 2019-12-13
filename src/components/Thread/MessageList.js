import React from 'react';
import { List } from '@material-ui/core';

import Message from './Message';
import FirstPost from './FirstPost';

export default function MessageList(props) {
  const { post, replies, userUid } = props;
  const { onKininaruClick, onGoodClick, onViewerOpen } = props;

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
        // goodClickedUseersが無い時のため
        let KininaruClickedUsers = item.KininaruClickedUsers
          ? item.KininaruClickedUsers
          : {};
        // 気になるButtonが押された数を判断する処理
        let KininaruCount = 0;
        for (let i of Object.values(KininaruClickedUsers)) {
          if (i === true) ++KininaruCount;
        }
        // 気になるButtonを押したか判断する処理
        let isKininaruClicked = false;
        if (KininaruClickedUsers[userUid] === true) {
          // 押していた時
          isKininaruClicked = true;
        } else {
          // 押していなかった時
          isKininaruClicked = false;
        }
        return (
          <Message
            key={item.id}
            name=''
            icon=''
            text={item.text}
            pictureURL={item.pictureURL}
            timeStamp={item.timeStamp}
            onViewerOpen={onViewerOpen}
            //GoodButtonのprops
            isGoodClicked={isGoodClicked}
            goodCount={goodCount}
            onGoodClick={() => onGoodClick(index)}
            //気になるボタンのprops
            isKininaruClicked={isKininaruClicked}
            KininaruCount={KininaruCount}
            onKininaruClick={() => onKininaruClick(index)}
          />
        );
      })}
    </List>
  );
}

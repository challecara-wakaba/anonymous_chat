import React from 'react';
import { Virtuoso } from 'react-virtuoso';

import Message from './Message';
import FirstPost from './FirstPost';

export default function MessageList(props) {
  const { post, replies, userUid, onGoodClick } = props;
  const { listStyle } = props;

  function itemKey(index) {
    if (index === 0) {
      // Postでは
      return post.id;
    } else {
      // repliesでは
      return replies[index - 1].id;
    }
  }

  function generateItem(index) {
    // リストの一番上にはPostを表示し，その後はrepliesを表示する
    if (index === 0) {
      // Postの時
      return (
        <FirstPost
          name={post.name}
          details={post.details}
          timeStamp={post.timeStamp}
          pictureURL={post.pictureURL}
        />
      );
    } else {
      // repliesの時
      const arrIndex = index - 1; // postの分一個大きいため引く

      // goodClickedUseersが無い時のため
      let goodClickedUsers = replies[arrIndex].goodClickedUsers
        ? replies[arrIndex].goodClickedUsers
        : {};

      // goodButtonを押したか判断する処理
      let isGoodClicked = false;
      let goodCount = 0;
      if (goodClickedUsers[userUid] === true) {
        // 押していた時
        isGoodClicked = true;
        // Objectのkeyのlengthを所得
        goodCount = Object.keys(replies[arrIndex].goodClickedUsers).length;
      } else {
        // 押していなかった時
        isGoodClicked = false;
        // Objectのkeyのlengthを所得
        goodCount = Object.keys(replies[arrIndex].goodClickedUsers).length - 1;
      }

      return (
        <Message
          name=''
          icon=''
          text={replies[arrIndex].text}
          timeStamp={replies[arrIndex].timeStamp}
          isGoodClicked={isGoodClicked}
          goodCount={goodCount}
          onClick={() => onGoodClick(arrIndex)}
        />
      );
    }
  }

  return (
    <Virtuoso
      style={listStyle}
      totalCount={replies.length + 1 /*FarstPostの分を一つ足す*/}
      computeItemKey={itemKey}
      item={generateItem}
    />
  );
}

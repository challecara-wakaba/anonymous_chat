import React from 'react';
import { Virtuoso } from 'react-virtuoso';

import Message from './Message';
import FirstPost from './FirstPost';

export default function MessageList(props) {
  const { post, replies } = props;
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
      return (
        <Message
          name={replies[arrIndex].name}
          icon=''
          text={replies[arrIndex].text}
          timeStamp={replies[arrIndex].timeStamp}
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

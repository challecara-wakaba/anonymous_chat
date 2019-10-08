import React from 'react';
import { Virtuoso } from 'react-virtuoso';

import Message from './Message';

export default function MessageList(props) {
  const { replies } = props;
  const { listStyle } = props;

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
      style={listStyle}
      totalCount={replies.length}
      computeItemKey={index => replies[index].id}
      item={generateItem}
    />
  );
}

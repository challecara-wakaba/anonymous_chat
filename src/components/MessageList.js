import React, { useEffect } from 'react';
import { VariableSizeList } from 'react-window';

import Message from './Message';

// リストのサイズを動的に変更するとバグるため，最初に決定しておく
const THEMESPACING = 8; // 初期せってがtheme.spacing == 8px のため
const LISTHEIGHT = document.documentElement.clientHeight - THEMESPACING * 8;
const DEFAULTITEMSIZE = THEMESPACING * 12;

export default function MessageList(props) {
  const { replies } = props;
  let listRef = React.createRef();

  function listItems({ data, index, style }) {
    // react-windowのFixedSizeListはchildrenにリスト要素を返す関数を渡す
    //　公式のリファレンスをよく読むべき
    const item = data[index];
    return (
      <Message
        reactWindowStyle={style}
        name={item.name}
        icon=''
        text={item.text}
        timeStamp={item.timeStamp}
      />
    );
  }

  function calculateItemSize(index) {
    const text = replies[index].text;
    let textFeedSum = 0;
    // \nを探索
    for (let i = 0; i < text.length; ++i) {
      if (text[i] === '\n') {
        ++textFeedSum;
      }
    }
    // １行改行されるたびにtheme.spacing * 2 だけ高くなる
    return DEFAULTITEMSIZE + (textFeedSum - 1) * THEMESPACING * 3;
  }

  useEffect(() => {
    if (replies.length > 0) {
      listRef.current.scrollToItem(replies.length);
    }
  });

  return (
    <VariableSizeList
      height={LISTHEIGHT}
      width='100%'
      itemSize={calculateItemSize}
      itemCount={replies.length}
      itemData={replies}
      itemKey={(index, data) => data[index].id}
      ref={listRef}
    >
      {listItems}
    </VariableSizeList>
  );
}

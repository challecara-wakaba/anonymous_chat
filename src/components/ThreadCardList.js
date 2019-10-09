import React from 'react';
import { Virtuoso } from 'react-virtuoso';

import ThreadCard from './ThreadCard';

export default function ThreadCardList(props) {
  const { listStyle, threads } = props;

  function generateItem(index) {
    return (
      <ThreadCard
        timeStamp={threads[index].timeStamp}
        title={threads[index].title}
        details={threads[index].details}
        pictureURL={threads[index].pictureURL}
      />
    );
  }

  return (
    <Virtuoso
      style={listStyle}
      totalCount={threads.length}
      computeItemKey={index => threads[index].id}
      item={generateItem}
    />
  );
}

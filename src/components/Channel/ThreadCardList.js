import React from 'react';
import { List } from '@material-ui/core';

import ThreadCard from './ThreadCard';

export default function ThreadCardList(props) {
  const { threads } = props;

  return (
    <List>
      {threads.map((item, index) => {
        return (
          <ThreadCard
            key={item.id}
            threadId={item.id}
            timeStamp={item.timeStamp}
            title={item.title}
            details={item.details}
            pictureURL={item.pictureURL}
            replyCount={item.replyCount}
          />
        );
      })}
    </List>
  );
}

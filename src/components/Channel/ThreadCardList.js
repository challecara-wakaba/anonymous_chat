import React from 'react';
import { List } from '@material-ui/core';

import ThreadCard from './ThreadCard';

export default function ThreadCardList(props) {
  const { threads, user } = props;

  return (
    <List>
      {threads.map((item, index) => {
        // kininaruButtonが押されたか判断する処理

        // kininaruCLickedUsersがなかった時のため
        let kininaruClickedUsers = threads[index].kininaruClickedUsers
          ? threads[index].kininaruClickedUsers
          : {};
        let isKininaruClicked = false;
        if (kininaruClickedUsers[user.uid]) {
          // 押していた時
          isKininaruClicked = true;
        } else {
          // 押していなかった時
          isKininaruClicked = false;
        }

        return (
          <ThreadCard
            key={item.id}
            threadId={item.id}
            timeStamp={item.timeStamp}
            title={item.title}
            details={item.details}
            pictureURL={item.pictureURL}
            replyCount={item.replyCount}
            isKininaruClicked={isKininaruClicked}
          />
        );
      })}
    </List>
  );
}

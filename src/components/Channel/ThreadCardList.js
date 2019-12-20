import React from 'react';
import { List } from '@material-ui/core';

import ThreadCard from './ThreadCard';

export default function ThreadCardList(props) {
  const { threads, user } = props;
  const { onKininaruClick } = props;

  return (
    <List>
      {threads.map(item => {
        // kininaruButtonが押されたか判断する処理

        // kininaruCLickedUsersがなかった時のため
        let kininaruClickedUsers = item.kininaruClickedUsers
          ? item.kininaruClickedUsers
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
            onKininaruClick={() => onKininaruClick(item.id)} // スレッドのidを渡す
          />
        );
      })}
    </List>
  );
}

import React from 'react';
import { Virtuoso } from 'react-virtuoso';
import { makeStyles } from '@material-ui/core/styles';

import ThreadCard from './ThreadCard';

const useStyles = makeStyles(theme => ({
  root: {
    height: document.documentElement.clientHeight,
    width: document.documentElement.clientWidth
  }
}));

export default function ThreadCardList(props) {
  const classes = useStyles();
  const { threads } = props;

  function generateItem(index) {
    return (
      <ThreadCard
        title={threads[index].title}
        details={threads[index].details}
        pictureURL={threads[index].pictureURL}
      />
    );
  }

  return (
    <Virtuoso
      className={classes.root}
      totalCount={threads.length}
      computeItemKey={index => threads[index].id}
      item={generateItem}
    />
  );
}

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemAvatar, Box } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(theme => ({
  middleContainer: {
    // これを指定しておかないとoverflowWrapが効かない
    // ListItemAvatorのmin-widthが56pxのため56px引く
    minWidth: 'calc(100% - 56px)'
  }
}));

export default function SkeltonMessage() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <ListItem alignItems='flex-start'>
        <ListItemAvatar>
          <Skeleton variant='circle' width={40} height={40} />
        </ListItemAvatar>
        <div className={classes.middleContainer}>
          <Box pt={1}>
            <Skeleton variant='text' height={10} width={'40%'} />
          </Box>
          <Box pt={1} pb={0.5}>
            <Skeleton variant='text' height={10} width={'80%'} />
            <Skeleton variant='text' height={10} width={'60%'} />
          </Box>
        </div>
      </ListItem>
    </React.Fragment>
  );
}

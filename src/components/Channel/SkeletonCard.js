import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Divider, Box } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: 'auto',
    marginBottom: theme.spacing(1),
    marginRight: 'auto',
    maxWidth: theme.breakpoints.values.md,
    background: theme.background
  },
  topAreaContainer: {
    paddingBottom: theme.spacing(1),
    color: '#142471'
  },
  skeletonImage: {
    margin: '0 auto'
  },
  divider: {
    height: 1
  }
}));

export default function SkeltonCard() {
  const classes = useStyles();
  return (
    <Card className={classes.root} elevation={1} square>
      <Divider className={classes.divider} />
      <CardContent className={classes.topAreaContainer}>
        <Skeleton type='text' height={12} width={'40%'} />
        <Box pt={2} pb={1}>
          <Skeleton type='text' height={10} width={'80%'} />
          <Skeleton type='text' height={10} width={'60%'} />
        </Box>
        <Box pt={1} pb={2}>
          <Skeleton
            variant='rect'
            height={135}
            width={240}
            className={classes.skeletonImage}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

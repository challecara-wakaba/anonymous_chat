import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: 'auto',
    marginBottom: theme.spacing(1),
    marginRight: 'auto',
    maxWidth: theme.breakpoints.values.md
  },
  image: {
    marginRight: 'auto',
    marginBottom: theme.spacing(3),
    marginLeft: 'auto',
    maxHeight: 180,
    maxWidth: 320
  },
  divider: {
    height: 1
  }
}));

// テスト用
const TITLE = '過去問　2-1';
const DETEAL = 'この問題の解き方教えてください';
const PICURL = 'http://img-cdn.jg.jugem.jp/993/154735/20101224_1438937.jpg';
const PICTURENAME = 'demo';
const NOTIS = '2件の返信';

const ThreadOverview = props => {
  const classes = useStyles();
  return (
    <Card className={classes.root} elevation={1} square>
      <Divider className={classes.divider} />
      <CardActionArea>
        <CardContent>
          <Typography variant='h5' components='h2' gutterBottom>
            {TITLE}
          </Typography>
          <Typography
            variant='body1'
            components='p'
            color='textSecondary'
            gutterBottom
          >
            {DETEAL}
          </Typography>
        </CardContent>
        <CardMedia
          className={classes.image}
          component='img'
          alt={PICTURENAME}
          image={PICURL}
          title={PICTURENAME}
        />
        <Divider />
        <CardContent>
          <Typography variant='body1'>{NOTIS}</Typography>
        </CardContent>
      </CardActionArea>
      <Divider className={classes.divider} />
    </Card>
  );
};

export default ThreadOverview;

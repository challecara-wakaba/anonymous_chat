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
  timeStamp: {
    textAlign: 'right'
  },
  image: {
    marginRight: 'auto',
    marginBottom: theme.spacing(3),
    marginLeft: 'auto',
    maxHeight: 135,
    maxWidth: 240
  },
  divider: {
    height: 1
  }
}));

// テスト用
const NOTIS = '2件の返信';

const ThreadCard = props => {
  const classes = useStyles();
  const { timeStamp, title, details, pictureURL } = props;

  const convertDateFormat = date => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = ('0' + date.getHours()).slice(-2); // 一桁の時は0を埋めて2桁にする
    const minute = ('0' + date.getMinutes()).slice(-2); // 一桁の時は0を埋めて2桁にする
    const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];

    return `${month}月${day}日(${dayOfWeek}) ${hour}:${minute}`;
  };

  return (
    <Card className={classes.root} elevation={1} square>
      <Divider className={classes.divider} />
      <CardActionArea>
        <CardContent>
          <Typography variant='h5' components='h2' gutterBottom>
            {title}
          </Typography>
          <Typography
            className={classes.timeStamp}
            variant='body1'
            components='span'
            color='textSecondary'
            gutterBottom
          >
            {convertDateFormat(timeStamp)}
          </Typography>
          <Typography
            variant='body1'
            components='p'
            color='textSecondary'
            gutterBottom
          >
            {details}
          </Typography>
        </CardContent>
        {pictureURL && (
          // urlがundefinedだったら表示しない
          <CardMedia
            className={classes.image}
            component='img'
            image={pictureURL}
          />
        )}
        <Divider />
        <CardContent>
          <Typography variant='body1'>{NOTIS}</Typography>
        </CardContent>
      </CardActionArea>
      <Divider className={classes.divider} />
    </Card>
  );
};

export default ThreadCard;

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
  topAreaContainer: {
    paddingBottom: theme.spacing(1)
  },
  titleAreaContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  timeStamp: {
    fontSize: 10
  },
  image: {
    marginRight: 'auto',
    marginBottom: theme.spacing(2),
    marginLeft: 'auto',
    maxHeight: 135,
    maxWidth: 240
  },
  newsBar: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
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
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];

    return `${year}年${month}月${day}日(${dayOfWeek})`;
  };

  return (
    <Card className={classes.root} elevation={1} square>
      <Divider className={classes.divider} />
      <CardActionArea>
        <CardContent className={classes.topAreaContainer}>
          <div className={classes.titleAreaContainer}>
            <Typography variant='subtitle1' components='h2' gutterBottom>
              {title}
            </Typography>
            <Typography
              className={classes.timeStamp}
              components='span'
              color='textSecondary'
              gutterBottom
            >
              {convertDateFormat(timeStamp)}
            </Typography>
          </div>
          <Typography
            variant='body2'
            components='p'
            color='textSecondary'
            gutterBottom
          >
            {details}
          </Typography>
        </CardContent>
        {!(!pictureURL || pictureURL === '') && (
          // urlがundefinedか空文字だったら表示しない
          <CardMedia
            className={classes.image}
            component='img'
            image={pictureURL}
          />
        )}
        <Divider />
        <CardContent className={classes.newsBar}>
          <Typography variant='body2'>{NOTIS}</Typography>
        </CardContent>
      </CardActionArea>
      <Divider className={classes.divider} />
    </Card>
  );
};

export default ThreadCard;

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.threadBackground
  },
  Name: {
    color: '#142471'
  },
  image: {
    margin: `${theme.spacing(2)}px auto`,
    maxHeight: 200,
    maxWidth: 240
  }
}));

export default function FirstPost(props) {
  const classes = useStyles();
  const { name, details, pictureURL, timeStamp } = props;
  const { onViewerOpen } = props;

  function convertDateFormat(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = ('0' + date.getHours()).slice(-2); // 一桁の時は0を埋めて2桁にする
    const minute = ('0' + date.getMinutes()).slice(-2); // 一桁の時は0を埋めて2桁にする
    const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];

    return `${month}月${day}日(${dayOfWeek}) ${hour}:${minute}`;
  }

  return (
    <div className={classes.root}>
      <ListItem alignItems='flex-start'>
        <ListItemAvatar>
          <Avatar /* alt={} src={} */ />
        </ListItemAvatar>
        <ListItemText
          primary={
            <React.Fragment>
              <Typography
                component='span'
                variant='subtitle1'
                className={classes.Name}
              >
                {name}
              </Typography>
              {'  ' /*nameとtimeStampの間の余白*/}
              <Typography component='span' variant='caption'>
                {convertDateFormat(timeStamp)}
              </Typography>
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <Typography component='span' variant='body2'>
                {details}
              </Typography>
              <br />
              <img
                className={classes.image}
                src={pictureURL}
                alt=' '
                onClick={() => onViewerOpen(pictureURL)}
              />
            </React.Fragment>
          }
        ></ListItemText>
      </ListItem>
    </div>
  );
}

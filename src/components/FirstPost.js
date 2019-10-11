import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const NAME = 'annin';
const TIMESTAMP = new Date();
const TEXT = 'この問題教えて';

const useStyles = makeStyles(theme => ({
  image: {
    margin: `${theme.spacing(2)}px auto`,
    maxHeight: 135,
    maxWidth: 240
  }
}));

export default function FirstPost(props) {
  const classes = useStyles();

  function convertDateFormat(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = ('0' + date.getHours()).slice(-2); // 一桁の時は0を埋めて2桁にする
    const minute = ('0' + date.getMinutes()).slice(-2); // 一桁の時は0を埋めて2桁にする
    const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];

    return `${month}月${day}日(${dayOfWeek}) ${hour}:${minute}`;
  }

  return (
    <ListItem alignItems='flex-start'>
      <ListItemAvatar>
        <Avatar /* alt={} src={} */ />
      </ListItemAvatar>
      <ListItemText
        primary={
          <React.Fragment>
            <Typography component='span' variant='subtitle1'>
              {NAME}
            </Typography>
            {'  ' /*nameとtimeStampの間の余白*/}
            <Typography
              component='span'
              variant='caption'
              color='textSecondary'
            >
              {convertDateFormat(TIMESTAMP)}
            </Typography>
          </React.Fragment>
        }
        secondary={
          <React.Fragment>
            <Typography component='span' variant='body2' color='textPrimary'>
              {TEXT}
            </Typography>
            <br />
            <img
              className={classes.image}
              src='https://i0.wp.com/nobon.me/wp-content/uploads/2017/04/the_legend_of_zelda_breath_of_the_wild_4k-2560x1600.jpg'
              alt=' '
            />
          </React.Fragment>
        }
      ></ListItemText>
    </ListItem>
  );
}

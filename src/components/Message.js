import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import GoodButton from './GoodButton';

const useStyles = makeStyles(theme => ({
  inline: {
    display: 'inline',
    color: '#000000'
  },
  iamge: {
    maxHeight: 200,
    mexWidth: 240
  }
}));

const Message = props => {
  const classes = useStyles();
  const {
    name,
    icon,
    timeStamp,
    text,
    pictureURL,
    isGoodClicked,
    goodCount
  } = props;
  const { onGoodClick, onViewerOpen } = props;

  const convertDateFormat = timestamp => {
    const date = timestamp.toDate(); // firebaseのtimestamp型をDate型に変換
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = ('0' + date.getHours()).slice(-2); // 一桁の時は0を埋めて2桁にする
    const minute = ('0' + date.getMinutes()).slice(-2); // 一桁の時は0を埋めて2桁にする
    const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];

    return `${month}月${day}日(${dayOfWeek}) ${hour}:${minute}`;
  };

  const convertLineFeed = text => {
    // 改行コード\nを<br />に変換
    // これを行わないとテキストが改行されない
    return text.split('\n').map((line, key) => (
      <span key={key}>
        {line}
        <br />
      </span>
    ));
  };

  return (
    <ListItem alignItems='flex-start'>
      <ListItemAvatar>
        <Avatar alt={name} src={icon} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <React.Fragment>
            <Typography
              component='span'
              variant='subtitle1'
              className={classes.inline}
            >
              {name}
            </Typography>
            {'  ' /*nameとtimeStampの間の余白*/}
            <Typography
              component='span'
              variant='caption'
              className={classes.inline}
            >
              {convertDateFormat(timeStamp)}
            </Typography>
          </React.Fragment>
        }
        secondary={
          <React.Fragment>
            {text !== '' && (
              /* 空文字列だったら表示しない*/
              <Typography
                component='span'
                variant='body2'
                className={classes.inline}
              >
                {convertLineFeed(text)}
              </Typography>
            )}
            <br />
            {!(pictureURL === '' || !pictureURL) && (
              /* 空文字列かundefindかnullだったら表示しない */
              <React.Fragment>
                <img
                  className={classes.iamge}
                  src={pictureURL}
                  alt=' '
                  onClick={() => onViewerOpen(pictureURL)}
                />
                <br />
              </React.Fragment>
            )}
            <GoodButton
              isGoodClicked={isGoodClicked}
              goodCount={goodCount}
              onClick={onGoodClick}
            />
          </React.Fragment>
        }
      />
    </ListItem>
  );
};

export default Message;

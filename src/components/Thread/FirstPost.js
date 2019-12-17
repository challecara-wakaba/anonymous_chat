import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import KininaruButton from './KininaruButton';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.threadBackground
  },
  middleContainer: {
    // これを指定しておかないとoverflowWrapが効かない
    // ListItemAvatorのmin-widthが56pxのため56px引く
    minWidth: 'calc(100% - 56px)'
  },
  Name: {
    color: '#142471'
  },
  details: {
    whiteSpace: 'pre-wrap',
    overflowWrap: 'break-word'
  },
  image: {
    margin: `${theme.spacing(2)}px auto`,
    maxHeight: 200,
    maxWidth: 240
  }
}));

export default function FirstPost(props) {
  const classes = useStyles();
  const { name, details, pictureURL, timeStamp, isKininaruClicked } = props;
  const { onKininaruClick, onViewerOpen } = props;

  function convertDateFormat(timestamp) {
    if (!timestamp) return;
    const date = timestamp.toDate(); // firebaseのtimestamp型をDate型に変換
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
        <div className={classes.middleContainer}>
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
                <Typography
                  component='span'
                  variant='body2'
                  className={classes.details}
                >
                  {details}
                </Typography>
                <br />
              </React.Fragment>
            }
          />
          {pictureURL && (
            <img
              className={classes.image}
              src={pictureURL}
              alt=' '
              onClick={() => onViewerOpen(pictureURL)}
            />
          )}
          <br />
          <KininaruButton
            isKininaruClicked={isKininaruClicked}
            onClick={onKininaruClick}
          />
        </div>
      </ListItem>
    </div>
  );
}

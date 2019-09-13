import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  inline: {
    display: 'inline'
  }
}));

const Message = props => {
  const classes = useStyles();
  const { name, icon, text } = props;

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
        primary={name}
        secondary={
          <React.Fragment>
            <Typography
              component='span'
              variant='body2'
              className={classes.inline}
              color='textPrimary'
            >
              {convertLineFeed(text)}
            </Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  );
};

export default Message;

import React, { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

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
  titleAreaContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    flexGrow: 1
  },
  timeStamp: {
    fontSize: 10,
    color: theme.text,
    marginLeft: 'auto',
    marginRight: 'unset'
  },
  Ver: {
    color: '#142471'
  },
  details: {
    color: theme.text,
    whiteSpace: 'pre-wrap',
    overflowWrap: 'break-word'
  },
  image: {
    marginRight: 'auto',
    marginBottom: theme.spacing(2),
    marginLeft: 'auto',
    objectFit: 'contain',
    height: 135,
    width: 240
  },
  newsBar: {
    display: 'flex',
    justifyContent: 'space-between',
    arignItems: 'center',
    paddingTop: '6px',
    paddingBottom: '6px',
    background: theme.secondary,
    color: theme.text
  },
  divider: {
    height: 1
  }
}));

const ThreadCard = props => {
  const classes = useStyles();
  const { url } = useRouteMatch();
  const { threadId, timeStamp, title, details, pictureURL, replyCount } = props;
  const [anchorEl, setAnchorEl] = useState(null); // あくまで開いているボタンの場所のstateのためrリフトアップしてない

  let jumpURL = `${url}/${threadId}`;

  const handleMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onBlur={handleMenuClose}
      onClose={handleMenuClose}
    >
      <MenuItem>削除</MenuItem> {/* for test */}
      <MenuItem>編集</MenuItem> {/* for test */}
    </Menu>
  );

  const convertDateFormat = timestamp => {
    const date = timestamp.toDate(); // firebaseのtimestamp型をDate型に変換
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}年${month}月${day}日`;
  };

  return (
    <Card className={classes.root} elevation={1} square>
      <Divider className={classes.divider} />
      <CardContent className={classes.topAreaContainer}>
        <div className={classes.titleAreaContainer}>
          <Link to={jumpURL}>
            <Typography
              className={classes.title}
              variant='subtitle1'
              components='h2'
              gutterBottom
            >
              {title}
            </Typography>
          </Link>
          <Typography
            className={classes.timeStamp}
            components='span'
            gutterBottom
          >
            {convertDateFormat(timeStamp)}
          </Typography>
          <IconButton edge='end' onClick={handleMenuOpen}>
            <MoreVertIcon className={classes.Ver} />
          </IconButton>
          {renderMenu}
        </div>
        <Typography
          variant='body2'
          components='p'
          className={classes.details}
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
        {replyCount === 0 ? (
          <Typography variant='caption'>{'まだ返信がありません'}</Typography>
        ) : (
          <Typography variant='caption'>{`${replyCount}件の返信`}</Typography>
        )}
      </CardContent>
      <Divider className={classes.divider} />
    </Card>
  );
};

export default ThreadCard;

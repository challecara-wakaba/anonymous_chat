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
    color: theme.primary
  },
  Ver: {
    color: '#142471'
  },
  Color: {
    color: theme.primary
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
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    background: theme.secondary
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
    const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];

    return `${year}年${month}月${day}日(${dayOfWeek})`;
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
          className={classes.Color}
          gutterBottom
        >
          {convertLineFeed(details)}
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
          <Typography variant='body2'>{'まだ返信がありません'}</Typography>
        ) : (
          <Typography variant='body2'>{`${replyCount}件の返信`}</Typography>
        )}
      </CardContent>
      <Divider className={classes.divider} />
    </Card>
  );
};

export default ThreadCard;

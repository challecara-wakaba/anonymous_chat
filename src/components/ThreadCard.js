import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
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
  title: {
    flexGrow: 1
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
  const [anchorEl, setAnchorEl] = useState(null);

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
      <MenuItem>TEST</MenuItem> {/* for test */}
      <MenuItem>TEST2</MenuItem> {/* fortest */}
    </Menu>
  );

  const convertDateFormat = date => {
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
      <CardActionArea>
        <CardContent className={classes.topAreaContainer}>
          <div className={classes.titleAreaContainer}>
            <Typography
              className={classes.title}
              variant='subtitle1'
              components='h2'
              gutterBottom
            >
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
            <IconButton edge='end' onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
            {renderMenu}
          </div>
          <Typography
            variant='body2'
            components='p'
            color='textSecondary'
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
          <Typography variant='body2'>{NOTIS}</Typography>
        </CardContent>
      </CardActionArea>
      <Divider className={classes.divider} />
    </Card>
  );
};

export default ThreadCard;

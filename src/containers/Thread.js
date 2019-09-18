import React from 'react';
import { connect } from 'react-redux';
import { FixedSizeList } from 'react-window';
import { makeStyles } from '@material-ui/core/styles';

import Message from '../components/Message';
import ThreadFooter from '../components/ThreadFooter';
import * as messageModules from '../modules/message';

const useStyles = makeStyles(theme => ({
  list: {
    backgroundColor: theme.palette.background.paper
  }
}));

// リストのサイズを動的に変更するとバグるため，最初に決定しておく
const THEMESPACING = 8; // 初期せってがtheme.spacing == 8px のため
const LISTHEIGHT = document.documentElement.clientHeight - THEMESPACING * 8;

const Thread = props => {
  const userName = 'annin'; // これはテストです

  const classes = useStyles();
  const { replies, addMessage } = props;

  const calculateItemSize = () => {};

  const passItemKey = (index, data) => {
    const item = data[index];
    return item.id;
  };

  const listItems = ({ data, index, style }) => {
    // react-windowのFixedSizeListは書きかたが独特であるため
    //　公式のリファレンスをよく読むべき
    const item = data[index];
    return (
      <Message
        reactWindowStyle={style}
        name={item.name}
        icon=''
        text={item.text}
        timeStamp={item.timeStamp}
      />
    );
  };

  const handleDispatch = text => {
    addMessage(userName, text);
  };

  return (
    <React.Fragment>
      <FixedSizeList
        className={classes.list}
        height={LISTHEIGHT}
        width='100%'
        itemSize={LISTHEIGHT / 9} ////////////お試しでハードコーティングしてる
        itemCount={replies.length}
        itemData={replies}
        itemKey={passItemKey}
      >
        {listItems}
      </FixedSizeList>
      <ThreadFooter onDispatch={handleDispatch} />
    </React.Fragment>
  );
};

// redux関連
const mapStateToProps = state => {
  return {
    replies: state.message.replies
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addMessage: (name, text) => dispatch(messageModules.addMessage(name, text))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Thread);

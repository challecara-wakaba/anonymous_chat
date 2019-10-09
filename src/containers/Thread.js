import React from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';
import MessageList from '../components/MessageList';
import ThreadFooter from '../components/ThreadFooter';
import * as threadActions from '../modules/threadModule';

const listSytle = {
  // VirtuosoはmakeStyleで高さと幅指定ができないためオブジェクトを作り
  // propsで渡しinlineCSSで適応させる
  marginTop: 64,
  height: document.documentElement.clientHeight - 64 - 64, //headerとfooterの高さ分引く
  width: '100%'
};

const Thread = props => {
  const userName = 'annin'; // これはテストです
  const THREADTITLE = 'threadTitle'; // これはテストです

  const { replies, addMessage } = props;
  const { url } = props.match;

  const _changeUpperDirectory = locationStr => {
    // Linkを用いて上の階層のディレクトリ移動する処理
    // shellでの'..'と同じ動きをする
    const separateURL = locationStr.split('/');
    const end = separateURL[separateURL.length - 1];
    return locationStr.replace('/' + end, ''); // endだけ置き換えると'/'が残るため'/'も置き換える
  };

  const handleHeadLeftButtonClick = () => {
    // 送信したらチャンネル画面に戻る
    // sendButtonのpropsにhistoryが渡されている
    props.history.push(_changeUpperDirectory(url));
  };

  const handleSubmit = text => {
    addMessage(userName, text);
  };

  return (
    <React.Fragment>
      <Header
        location='thread'
        onLeftButtonClick={handleHeadLeftButtonClick}
        label={THREADTITLE}
      />
      <MessageList listStyle={listSytle} replies={replies} />
      <ThreadFooter onSubmit={handleSubmit} />
    </React.Fragment>
  );
};

// redux関連
const mapStateToProps = state => {
  return {
    replies: state.thread.replies
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addMessage: (name, text) => dispatch(threadActions.addMessage(name, text))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Thread);

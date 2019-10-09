import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import ThreadCardList from '../components/ThreadCardList';
import ThreadAddButton from '../components/ThreadAddButton';

const listStyle = {
  // VirtuosoはmakeStyleで高さと幅指定ができないためオブジェクトを作り
  // propsで渡しinlineCSSで適応させる
  marginTop: 69, // ヘッダー分+5pxくらい余白を取る
  height: document.documentElement.clientHeight - 64, //headerとfooterの高さ分引く
  width: '100%'
};

const LABEL = '# 物理';
function Channel(props) {
  const { threads } = props;
  const { url } = props.match;

  return (
    <React.Fragment>
      <Header location='channel' label={LABEL} />
      <ThreadCardList listStyle={listStyle} threads={threads} />
      <Link to={`${url}/makeThread`}>
        <ThreadAddButton />
      </Link>
    </React.Fragment>
  );
}

function mapStateToProps(state) {
  return {
    threads: state.channel.threads
  };
}

export default connect(mapStateToProps)(Channel);

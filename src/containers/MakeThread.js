import React from 'react';
import { connect } from 'react-redux';

import MakeThreadForm from '../components/MakeThreadForm';
import * as channelActions from '../modules/channelModule';

function MakeThread(props) {
  const { addThread } = props;
  return (
    <React.Fragment>
      <MakeThreadForm addThread={addThread} />
    </React.Fragment>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    addThread: (title, details, pictureURL) =>
      dispatch(channelActions.addThread(title, details, pictureURL))
  };
}
export default connect(
  null,
  mapDispatchToProps
)(MakeThread);

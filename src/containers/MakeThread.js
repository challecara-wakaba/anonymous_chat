import React from 'react';
import { connect } from 'react-redux';

import MakeThreadForm from '../components/MakeThreadForm';

function MakeThread(props) {
  return (
    <React.Fragment>
      <MakeThreadForm />
    </React.Fragment>
  );
}

export default connect()(MakeThread);

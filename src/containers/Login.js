import React from 'react';
import { connect } from 'react-redux';

import LoginForm from '../components/LoginForm';

function Login(props) {
  return (
    <React.Fragment>
      <LoginForm />
    </React.Fragment>
  );
}

export default connect()(Login);

import React from 'react';
import { connect } from 'react-redux';

import LoginForm from '../components/LoginForm';

function handleSubmit() {}

function Login(props) {
  return (
    <React.Fragment>
      <LoginForm onSubmit={handleSubmit} />
    </React.Fragment>
  );
}

export default connect()(Login);

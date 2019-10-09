import React from 'react';
import { connect } from 'react-redux';

import LoginForm from '../components/LoginForm';
import firebase from 'firebase/app';
import 'firebase/auth';

function handleSubmit() {
  firebase
    .auth()
    .signInWithEmailAndPassword(null, null)
    .catch(function(error) {
      /*エラーの処理*/

      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
}

function Login(props) {
  return (
    <React.Fragment>
      <LoginForm onSubmit={handleSubmit} />
    </React.Fragment>
  );
}

export default connect()(Login);

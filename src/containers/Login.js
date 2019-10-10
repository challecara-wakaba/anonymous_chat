import React, { useState } from 'react';
import { connect } from 'react-redux';

import LoginForm from '../components/LoginForm';
import firebase from 'firebase/app';
import 'firebase/auth';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleTextChange(event) {
    const targetName = event.target.name;
    const value = event.target.value;
    switch (targetName) {
      case 'email':
        setEmail(value);
        return;
      case 'password':
        setPassword(value);
        return;
      default:
        return;
    }
  }

  function handleSubmit() {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
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
  return (
    <React.Fragment>
      <LoginForm
        email={email}
        password={password}
        onTextChange={handleTextChange}
        onSubmit={handleSubmit}
      />
    </React.Fragment>
  );
}

export default connect()(Login);

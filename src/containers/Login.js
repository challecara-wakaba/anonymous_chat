import React, { useState } from 'react';
import { connect } from 'react-redux';

import { TextFields, Buttons } from '../components/LoginForm';
import firebase from 'firebase/app';
import 'firebase/auth';

function Login(props) {
  // ログインに成功したときの異動先
  const DESTINATION = '/client/testChannel';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isUserFound, setIsUserFound] = useState(true);
  const [isCorrectPassword, setIsCorrectPassword] = useState(true);

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
    // フラグの初期化
    // これをしないと一度エラーが出ると消えなくなる
    setIsUserFound(true);
    setIsCorrectPassword(true);

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function() {
        // ログインできた時の処理
        // チャンネルに移動
        props.history.push(DESTINATION);
      })
      .catch(function(error) {
        /*エラーの処理*/
        var errorCode = error.code;
        var errorMessage = error.message;
        if (
          errorCode === 'auth/invalid-email' ||
          errorCode === 'auth/user-not-found'
        ) {
          setIsUserFound(false);
        } else if (errorCode === 'auth/wrong-password') {
          setIsCorrectPassword(false);
        } else if (errorCode === 'auth/too-many-requests') {
          alert(
            'ログインの失敗が一定回数を超えました。しばらくしてからもう一度お試しください。'
          );
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  }
  return (
    <React.Fragment>
      <TextFields
        email={email}
        password={password}
        isUserFound={isUserFound}
        isCorrectPassword={isCorrectPassword}
        onTextChange={handleTextChange}
      />
      <Buttons onSubmit={handleSubmit} />
    </React.Fragment>
  );
}

export default connect()(Login);

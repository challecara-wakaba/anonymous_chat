import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { TextFields, Buttons } from '../components/Login/LoginForm';
import LinearProgress from '@material-ui/core/LinearProgress';
import firebase from '../Firebase';
import 'firebase/auth';

import * as userModules from '../modules/userModule';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh'
  },
  progress: ({ isSending }) => ({
    zIndex: 1,
    display: isSending ? 'block' : 'none'
  })
}));

function Login(props) {
  const theme = useTheme();
  // ログインに成功したときの異動先
  const DESTINATION = '/client/home';

  const { loggedIn } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isUserFound, setIsUserFound] = useState(true);
  const [isCorrectPassword, setIsCorrectPassword] = useState(true);
  const [isSending, setIsSending] = useState(false); // ローディングアニメーションに用いる

  const classes = useStyles({ isSending });

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

    setIsSending(true); // ローディングアニメーションをオン

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function() {
        // ログインできた時の処理
        // ログインしたユーザーの情報をStoreに流す
        loggedIn(firebase.auth().currentUser);
        // チャンネルに移動
        props.history.push(DESTINATION);
      })
      .catch(function(error) {
        /*エラーの処理*/
        const errorCode = error.code;
        const errorMessage = error.message;
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

        setIsSending(false); // アニメーションをオフ
      });
  }
  return (
    <div className={classes.root}>
      <style>{`body {background-color: ${theme.background}}`}</style>
      <LinearProgress className={classes.progress} />
      <TextFields
        email={email}
        password={password}
        isUserFound={isUserFound}
        isCorrectPassword={isCorrectPassword}
        onTextChange={handleTextChange}
      />
      <Buttons onSubmit={handleSubmit} />
    </div>
  );
}

const mapDipatchToProps = dispatch => {
  return {
    loggedIn: user => dispatch(userModules.loggedIn(user))
  };
};
export default connect(null, mapDipatchToProps)(Login);

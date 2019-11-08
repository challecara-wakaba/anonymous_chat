import shortid from 'shortid';
//cloudfirestoreの初期化
import firebase from 'firebase';
import config from '../config/firebaseconfig';
firebase.initializeApp(config);
var db = firebase.firestore();
// action type
const ADD_MESSAGE = 'ADD_MESSAGE';

const initialState = {
  post: {
    id: shortid.generate(),
    name: 'annin',
    timeStamp: new Date(),
    title: 'ショッパーズ',
    details: 'ンョ゛ハー　゛',
    pictureURL: 'http://img-cdn.jg.jugem.jp/993/154735/20101224_1438937.jpg'
  },
  replies: []
};

// reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      const newMessage = {
        id: action.id,
        userUid: action.userUid,
        text: action.text,
        timeStamp: action.timeStamp
      };
      return Object.assign({}, state, {
        replies: [...state.replies, newMessage]
      });

    default:
      return state;
  }
};
export default reducer;

// Action Creators
export const addMessage = (userUid, text) => {
  db.collection('message')
    .doc(Date.now().toString())
    .set({
      uid: userUid,
      message: text
    })
    .then(function() {
      console.log('Document successfully written!');
    })
    .catch(function(error) {
      console.log('Error adding document: ', error);
    });
  return {
    type: ADD_MESSAGE,
    id: shortid.generate(),
    userUid: userUid,
    text: text,
    timeStamp: new Date()
  };
};

import shortid from 'shortid';
//cloudfirestore
import 'firebase/auth';
import firebase from 'firebase';
var db = firebase.firestore();
// action type
const ADD_MESSAGE = 'ADD_MESSAGE';

const initialState = {
  post: {
    id: shortid.generate(),
    name: 'annin',
    timeStamp: new Date(),
    title: 'ドリルp53 [B]-(1)',
    details: 'この英文の訳がわかりません',
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
  return {
    type: ADD_MESSAGE,
    id: shortid.generate(),
    userUid: userUid,
    text: text,
    timeStamp: new Date()
  };
};

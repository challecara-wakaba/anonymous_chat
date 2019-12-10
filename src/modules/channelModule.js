import shortid from 'shortid';
import firebase from '../Firebase';
const db = firebase.firestore();

// action type
const LOAD_THREAD = 'LOAD_THREAD';
const ADD_THREAD = 'ADD_THREAD';

const initialState = {
  threads: []
};

// reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_THREAD:
      return Object.assign({}, state, {
        threads: action.threads
      });

    case ADD_THREAD:
    default:
      return state;
  }
}

// Action Creators

export function loadThread(threads) {
  return {
    type: LOAD_THREAD,
    threads: threads
  };
}

export function addThread(userUid, title, details, pictureURL) {
  db.collection('testChannel')
    .doc('config')
    .set({
      userUid: userUid,
      title: title,
      details: details,
      pictureURL: pictureURL,
      timeStamp: new Date()
    })
    .catch(error => {
      console.log('Error adding Thread: ', error);
    });

  return {
    type: ADD_THREAD,
    id: shortid.generate(),
    timeStamp: new Date(),
    title: title,
    details: details,
    pictureURL: pictureURL
  };
}

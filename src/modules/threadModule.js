import shortid from 'shortid';
//cloudfirestoreの初期化
import firebase from 'firebase';
import config from '../config/firebaseconfig';
firebase.initializeApp(config);
var db = firebase.firestore();

// action type
const LOAD_MESSAGE = 'LOAD_MESSAGE';
const ADD_MESSAGE = 'ADD_MESSAGE';
const GOOD_BUTTON_CLICK = 'GOOD_BUTTON_CLICK';

const initialState = {
  post: {
    id: shortid.generate(),
    name: 'annin',
    timeStamp: new Date(),
    title: '物理',
    details: 'この問題がわかりません',
    pictureURL: 'http://img-cdn.jg.jugem.jp/993/154735/20101224_1438937.jpg'
  },
  replies: []
};

// reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_MESSAGE:
      return Object.assign({}, state, {
        replies: action.replies
      });

    case ADD_MESSAGE:
    case GOOD_BUTTON_CLICK:
    default:
      return state;
  }
};
export default reducer;

// Action Creators
export function loadMessage(replies) {
  // listenerから呼ばれるアクション
  return {
    type: LOAD_MESSAGE,
    replies: replies
  };
}
export const addMessage = (userUid, text, picture) => {
  async function sendMessage() {
    let pictureURL = null;
    // 写真がある場合、写真をアップロード
    if (picture !== null) {
      try {
        //画像のパス
        const filePath = `Pictures/${picture.name}`;
        const Ref = firebase.storage().ref(filePath);

        //送信
        await Ref.put(picture);
        // 画像のurlを所得
        pictureURL = await Ref.getDownloadURL();
      } catch (error) {
        console.log(error);
        return;
      }
    }

    const docKey = Date.now().toString();
    // サーバーにメッセージを送る
    db.collection('message')
      .doc(docKey)
      .set({
        id: docKey,
        userUid: userUid,
        text: text,
        timeStamp: new Date(),
        goodClickedUsers: {},
        pictureURL: pictureURL
      })
      .catch(function(error) {
        console.log('Error adding document: ', error);
      });
  }
  sendMessage();
  return {
    type: ADD_MESSAGE
  };
};
export function goodButtonClick(docKey, goodClickedUsers) {
  db.collection('message')
    .doc(docKey)
    .update({
      goodClickedUsers: goodClickedUsers
    })
    .catch(error => {
      console.log('Error updating document: ', error);
    });
  return {
    type: GOOD_BUTTON_CLICK
  };
}

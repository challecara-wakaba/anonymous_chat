import extractId from '../functions/extractId';
import firebase from '../Firebase';
var db = firebase.firestore();

// action type
const LOAD_MESSAGE = 'LOAD_MESSAGE';
const ADD_MESSAGE = 'ADD_MESSAGE';
const GOOD_BUTTON_CLICK = 'GOOD_BUTTON_CLICK';
const KININARU_BUTTON_CLICK = 'KININARU_BUTTON_CLICK';

const initialState = {
  post: {},
  replies: []
};

// reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_MESSAGE:
      return Object.assign({}, state, {
        post: action.post,
        replies: action.replies
      });

    case ADD_MESSAGE:
    case GOOD_BUTTON_CLICK:
    case KININARU_BUTTON_CLICK:
    default:
      return state;
  }
};
export default reducer;

// Action Creators
export function loadMessage(post, replies) {
  // listenerから呼ばれるアクション
  return {
    type: LOAD_MESSAGE,
    post: post,
    replies: replies
  };
}

export const addMessage = (url, userUid, text, picture) => {
  // '/client/:channel/:thread'の:channelと:threadを取り出す
  const [channelId, threadId] = extractId(url);
  // urlで指定されたチャンネルのfirebase参照を取得
  const ref = db
    .collection('channels')
    .doc(channelId)
    .collection('threads')
    .doc(threadId);

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

    // messagesのid
    const messageId = Date.now().toString();

    // サーバーにメッセージを送る
    ref
      .collection('messages')
      .doc(messageId)
      .set({
        id: messageId,
        userUid: userUid,
        text: text,
        timeStamp: new Date(),
        goodClickedUsers: {},
        KininaruClickedUsers: {},
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

export function goodButtonClick(url, messageId, goodClickedUsers) {
  // 'client/:channel/:thread'から:clientと:channelを取り出す
  const [channelId, threadId] = extractId(url);
  // 更新したいmessageのfirebase参照を取得
  const ref = db
    .collection('channels')
    .doc(channelId)
    .collection('threads')
    .doc(threadId)
    .collection('messages')
    .doc(messageId);

  // 更新
  ref
    .update({
      goodClickedUsers: goodClickedUsers
    })
    .catch(error => {
      console.log('Error updatin document: ', error);
    });

  return {
    type: GOOD_BUTTON_CLICK
  };
}

export function KininaruButtonClick(docKey, KininaruClickedUsers) {
  db.collection('message')
    .doc(docKey)
    .update({
      KininaruClickedUsers: KininaruClickedUsers
    })
    .catch(error => {
      console.log('Error updating document: ', error);
    });
  return {
    type: KININARU_BUTTON_CLICK
  };
}

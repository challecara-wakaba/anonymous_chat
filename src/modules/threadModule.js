import extractId from '../functions/extractId';
import firebase from '../Firebase';
var db = firebase.firestore();

// action type
const LOAD_POST = 'LOAD_POST';
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
    case LOAD_POST:
      return Object.assign({}, state, {
        post: action.post
      });
    case LOAD_MESSAGE:
      return Object.assign({}, state, {
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
export function loadPost(post) {
  // listenerから呼ばれるアクション
  return {
    type: LOAD_POST,
    post: post
  };
}

export function loadMessage(replies) {
  // listenerから呼ばれるアクション
  return {
    type: LOAD_MESSAGE,
    replies: replies
  };
}

export const addMessage = (url, userUid, text, picture, profile) => {
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
        const filePath = `Pictures/${channelId}/${threadId}/${picture.name}`;
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
    await ref
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

    // ランダムアイコンの設定の更新と
    // 返信の総数を管理するフィールドの更新
    console.log(profile);
    await ref.update({
      profile: profile,
      replyCount: firebase.firestore.FieldValue.increment(1)
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

export function KininaruButtonClick(url, KininaruClickedUsers) {
  // 'client/:channel/:thread'から:clientと:channelを取り出す
  const [channelId, threadId] = extractId(url);
  // 更新したいmessageのfirebase参照を取得
  const ref = db
    .collection('channels')
    .doc(channelId)
    .collection('threads')
    .doc(threadId);

  // 更新
  ref
    .update({
      KininaruClickedUsers: KininaruClickedUsers
    })
    .catch(error => {
      console.log('Error updatin document: ', error);
    });

  return {
    type: KININARU_BUTTON_CLICK
  };
}

import extractId from '../functions/extractId';
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

export function addThread(url, userUid, title, details, pictureURL) {
  // '/client/:channel/makeThread'の:channelを取り出す
  const [channelKey] = extractId(url);
  // threadKeyは現在時刻から生成
  const threadKey = Date.now().toString();
  // チャンネルのfirebase参照を取得
  const ref = db.collection('channels').doc(channelKey);

  // threadsを管理するcollectionに
  // threadを表すドキュメントを追加
  ref
    .collection('threads')
    .doc(threadKey)
    .set({
      // meta情報を格納
      id: threadKey,
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
    type: ADD_THREAD
  };
}

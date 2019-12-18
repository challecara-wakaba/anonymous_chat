import extractId from '../functions/extractId';
import firebase from '../Firebase';
import icons from '../icon';
//メール通知用
require('firebase/functions');
let data = {
  destination: 'kosentaguri1@gmail.com'
};
let context = {};
const db = firebase.firestore();

// action type
const LOAD_CHANNEL = 'LOAD_CHANNEL';
const LOAD_THREAD = 'LOAD_THREAD';
const ADD_THREAD = 'ADD_THREAD';

const initialState = {
  channels: [],
  threads: []
};

// reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CHANNEL:
      return Object.assign({}, state, {
        channels: action.channels
      });
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
export function loadChannel(channels) {
  return {
    type: LOAD_CHANNEL,
    channels: channels
  };
}

export function loadThread(threads) {
  return {
    type: LOAD_THREAD,
    threads: threads
  };
}

export function addThread(url, userUid, title, details, picture) {
  // '/client/:channel/makeThread'の:channelを取り出す
  const [channelKey] = extractId(url);
  // threadKeyは現在時刻から生成
  const threadKey = Date.now().toString();
  // チャンネルのfirebase参照を取得
  const ref = db.collection('channels').doc(channelKey);

  async function sendThread() {
    let pictureURL = null;
    // 写真がある場合、写真をアップロード
    if (picture !== null) {
      try {
        // 画像のパス
        const filePath = `Pictures/${channelKey}/${threadKey}/${picture.name}`;
        const Ref = firebase.storage().ref(filePath);

        // 送信
        await Ref.put(picture);
        // 画像のurlを取得
        pictureURL = await Ref.getDownloadURL();
      } catch (error) {
        console.log(error);
        return;
      }
    }

    // ランダムアイコンのために用意する
    //127個の整数配列Aを用意
    let Shuffled = [];
    //profileオブジェクトを用意
    let profile = {};
    for (let i = 0; i < 127; i++) {
      Shuffled.push(i);
    }
    //Aをシャッフル
    for (var i = Shuffled.length - 1; i > 0; i--) {
      var r = Math.floor(Math.random() * (i + 1));
      var tmp = Shuffled[i];
      Shuffled[i] = Shuffled[r];
      Shuffled[r] = tmp;
    }
    profile[userUid] = icons[Shuffled[0]];

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
        timeStamp: new Date(),
        replyCount: 0,
        Shuffled,
        profile
      })
      .catch(error => {
        console.log('Error adding Thread: ', error);
      });

    //メール送信
    var sendMail = firebase.functions().httpsCallable('sendMail');
    sendMail(data, context).then(function(result) {
      console.log('送信成功byChannelmodule');
    });
  }
  sendThread();
  return {
    type: ADD_THREAD
  };
}

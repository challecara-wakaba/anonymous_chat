// firebase.Userから渡される情報を保存するために用いる
// このファイルは対応するcontainersはなく、
//　アクションクリエータはApp.jsで呼び出される

// action type
const LOGGED_IN = 'LOGGED_IN';
const NOT_LOGGED_IN = 'NOT_LOGGED_IN';

// reducer
export default function reducer(state = {}, action) {
  switch (action.type) {
    case LOGGED_IN:
    case NOT_LOGGED_IN:
      const user = {
        displayName: action.displayName,
        email: action.email,
        emailVerified: action.emailVerified,
        photoURL: action.photoURL,
        isAnonymous: action.isAnonymous,
        uid: action.uid,
        providerData: action.providerData
      };
      return Object.assign({}, state, {
        user: user
      });
    default:
      return state;
  }
}

// Action Creators
export function loggedIn(user) {
  return {
    type: LOGGED_IN,
    displayName: user.displayName,
    email: user.email,
    emailVerified: user.emailVerified,
    photoURL: user.photoURL,
    isAnonymous: user.isAnonymous,
    uid: user.uid,
    providerData: user.providerData
  };
}

export function notLoggedIn() {
  return {
    type: NOT_LOGGED_IN,
    displayName: null,
    email: null,
    emailVerified: null,
    photoURL: null,
    isAnonymous: null,
    uid: null,
    providerData: null
  };
}

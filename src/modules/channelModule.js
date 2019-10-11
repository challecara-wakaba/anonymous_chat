import shortid from 'shortid';

// action type
const ADD_THREAD = 'ADD_THREAD';

const initialState = {
  threads: [
    {
      id: shortid.generate(),
      timeStamp: new Date(),
      title: 'ドリルp53 [B]-(1)',
      details: 'この英文の訳がわかりません',
      pictureURL: 'http://img-cdn.jg.jugem.jp/993/154735/20101224_1438937.jpg'
    }
  ]
};

// reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_THREAD:
      const newThread = {
        id: action.id,
        timeStamp: action.timeStamp,
        title: action.title,
        details: action.details,
        pictureURL: action.pictureURL
      };
      return Object.assign({}, state, {
        threads: [newThread, ...state.threads]
      });

    default:
      return state;
  }
}

// Action Creators
export function addThread(title, details, pictureURL) {
  return {
    type: ADD_THREAD,
    id: shortid.generate(),
    timeStamp: new Date(),
    title: title,
    details: details,
    pictureURL: pictureURL
  };
}

import shortid from 'shortid';

// action type
const ADD_MESSAGE = 'ADD_MESSAGE';

const initialState = {
  replies: []
};

// reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      const newMessage = {
        id: action.id,
        name: action.name,
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
export const addMessage = (name, text) => {
  return {
    type: ADD_MESSAGE,
    id: shortid.generate(),
    name: name,
    text: text,
    timeStamp: new Date()
  };
};

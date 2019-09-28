import shortid from 'shortid';
const initialState = {
  threads: [
    {
      id: shortid.generate(),
      title: '過去問 [2]-(1) 力のモーメント',
      details: 'この問題の解き方がわかりません',
      pictureURL: 'http://img-cdn.jg.jugem.jp/993/154735/20101224_1438937.jpg'
    }
  ]
};
// reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

// 引数   string: URL
// 返り値 Array: URLからidとなる部分を抽出した配列
// fireStoreから情報をとってくる時に使える

// 使用例
// 引数:   '/client/:channel/:thread'
// 返り値: [':channel', ':thread']

export default function extractId(url) {
  let splitedURL = url.split('/'); // '/'で分割する
  if (splitedURL[splitedURL.length - 1] === '') {
    // 　URLの末尾に'/'を入れていた場合に入る空文字を取り除く
    splitedURL.pop();
  }
  return splitedURL.slice(2); // ''と'client'を取り除いて返す
}

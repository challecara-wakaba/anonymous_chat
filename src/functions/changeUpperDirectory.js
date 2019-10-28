export default function changeUpperDirectory(locationStr) {
  // Linkを用いて上の階層のディレクトリ移動する処理
  // shellでの'..'と同じ動きをする
  const separateURL = locationStr.split('/');
  const end = separateURL[separateURL.length - 1];
  return locationStr.replace('/' + end, ''); // endだけ置き換えると'/'が残るため'/'も置き換える
}

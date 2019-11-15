import React, { useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase';
import 'firebase/storage';

//スタイル
const useStyles = makeStyles(theme => ({
  modalBottom: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(6)
  },
  ImageButton: {
    color: '#FFFFFF',
    backgroundColor: '#000000',
    padding: '4px 8px'
  }
}));

//UploadPicButtonコンポーネント
export default function UploadPicButton(props) {
  //stateの初期化
  const [state, setState] = useState(null);
  //スタイルの宣言
  const classes = useStyles();
  //inputタグの目印
  const pickFile = useRef(null);
  //inputタグを呼び出す
  const handlePictureButtonClick = () => {
    pickFile.current.click();
  };
  //画像の選択時に起動、stateに画像をセット
  const handleChange = event => {
    event.preventDefault();
    const Picture = event.target.files[0];
    setState({ Picture });
  };
  //PictureUpload関数を呼び出して画像をサーバーに送信
  const handleSubmit = event => {
    event.preventDefault();
    PictureUpload(state.Picture);
  };
  //ファイルのアップロード
  const PictureUpload = async Picture => {
    try {
      //画像のパス
      const filePath = `Pictures/${Picture.name}`;
      const Ref = firebase.storage().ref(filePath);
      //送信
      const fileSnapshot = await Ref.put(Picture);
      console.log(fileSnapshot);
    } catch (error) {
      console.log(error);
      return;
    }
  };
  //描画するとこ
  return (
    <form className={classes.modalBottom} onSubmit={e => handleSubmit(e)}>
      <input
        type='file'
        ref={pickFile}
        style={{ display: 'none' }}
        accept='image/*'
        onChange={e => handleChange(e)}
      />
      <Button
        variant='contained'
        size='medium'
        className={classes.ImageButton}
        onClick={handlePictureButtonClick}
      >
        画像を追加
      </Button>
      <Button type='submit'>send</Button>
    </form>
  );
}

import React, { useRef } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

//スタイル
const useStyles = makeStyles(theme => ({
  ImageButton: {
    color: '#FFFFFF',
    backgroundColor: '#000000',
    padding: '8px 8px',
    '&:hover': {
      backgroundColor: '#000000'
    }
  }
}));

//UploadPicButtonコンポーネント
export default function UploadPicButton(props) {
  //propsを受け取る
  const { onChange } = props;
  //スタイルの宣言
  const classes = useStyles();
  //inputタグの目印
  const pickFile = useRef(null);
  //inputタグを呼び出す
  const handlePictureButtonClick = () => {
    pickFile.current.click();
  };
  //描画するとこ
  return (
    <div>
      <input
        type='file'
        ref={pickFile}
        style={{ display: 'none' }}
        accept='image/*'
        onChange={e => onChange(e)}
      />
      <Button
        variant='contained'
        size='medium'
        className={classes.ImageButton}
        onClick={handlePictureButtonClick}
      >
        画像を追加
      </Button>
    </div>
  );
}

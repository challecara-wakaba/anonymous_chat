import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBox from '@material-ui/core/Checkbox';
const useStyles = makeStyles(theme => ({
  maincontainer: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    padding: '0 8px'
  },
  subcontainer: {
    display: 'flex',
    justifyContent: 'space-around',
    paddingBottom: theme.spacing(1)
  },
  thirdcontainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    padding: '8px 0 8px 8px'
  },
  forthcontainer: {
    margin: '0 8px',
    display: 'flex',
    alignItems: 'center'
  },
  LeftRight: {
    margin: '0 8px'
  },
  Left: {
    marginLeft: theme.spacing(1)
  },
  Padding: {
    padding: '0 10px'
  },
  selectForm: {
    margin: theme.spacing(4),
    backgroundColor: 'pink'
  }
}));

function TextFields() {
  const classes = useStyles();

  return (
    <form className={classes.maincontainer} noValidate autoComplete='off'>
      <TextField
        required
        id='outlined-required'
        label='題名'
        placeholder='過去問　[2]-(1) 力のモーメント'
        margin='normal'
        variant='outlined'
      />
      <TextField
        multiline
        id='outlined-multilined-static'
        label='質問内容'
        placeholder='(例)この問題の解き方がわかりません'
        rows='4'
        classname={classes.LeftRight}
        margin='normal'
        variant='outlined'
      />
    </form>
  );
}

function ImageButton() {
  const classes = useStyles();

  return (
    <div className={classes.thirdcontainer}>
      <Button variant='contained' size='medium' color='primary'>
        画像を追加
      </Button>
      <h5 className={classes.forthcontainer}>1枚追加できます</h5>
    </div>
  );
}

function Checkbox() {
  const classes = useStyles();

  return (
    <FormGroup column className={classes.selectForm} required>
      <h2>タグを選択してください</h2>
      <FormControlLabel
        control={<CheckBox value='checkedA' color='primary' />}
        label='#１年'
      />
      <FormControlLabel
        control={<CheckBox value='checkedA' color='primary' />}
        label='#２年'
      />
      <FormControlLabel
        control={<CheckBox value='checkedA' color='primary' />}
        label='#３年'
      />
      <FormControlLabel
        control={<CheckBox value='checkedA' color='primary' />}
        label='#４年'
      />
      <FormControlLabel
        control={<CheckBox value='checkedA' color='primary' />}
        label='#５年'
      />
      <FormControlLabel
        control={<CheckBox value='checkedA' color='primary' />}
        label='#前期中間'
      />
      <FormControlLabel
        control={<CheckBox value='checkedA' color='primary' />}
        label='#前期期末'
      />
      <FormControlLabel
        control={<CheckBox value='checkedA' color='primary' />}
        label='#後期中間'
      />
      <FormControlLabel
        control={<CheckBox value='checkedA' color='primary' />}
        label='#年度末'
      />
    </FormGroup>
  );
}

function OtherButtons() {
  const classes = useStyles();
  return (
    <div className={classes.subcontainer}>
      <Button
        variant='contained'
        size='medium'
        color='secondary'
        className={classes.Padding}
      >
        キャンセル
      </Button>
      <Button variant='contained' color='primary' className={classes.button}>
        送信
        <SendIcon className={classes.Left}></SendIcon>
      </Button>
    </div>
  );
}

export default function MakeThreadForm() {
  return (
    <div>
      <TextFields />
      <ImageButton />
      <Checkbox />
      <OtherButtons />
    </div>
  );
}

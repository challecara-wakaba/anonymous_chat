import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBox from '@material-ui/core/Checkbox';
import SendIcon from '@material-ui/icons/Send';
const useStyles = makeStyles(theme => ({
  firstbox: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    padding: '0 8px'
  },
  secondbox: {
    display: 'flex',
    justifyContent: 'flex-start',
    padding: '16px 8px'
  },
  thirdbox: {
    margin: '0 8px',
    display: 'flex',
    alignItems: 'center'
  },
  forthbox: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(1),
    padding: '0 16px 64px 16px',
    backgroundColor: 'pink'
  },
  fifthbox: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '48px 0',
    padding: '0 16px'
  },
  firstLeft: {
    marginLeft: theme.spacing(11)
  },
  secondLeft: {
    marginLeft: theme.spacing(7)
  },
  thirdLeft: {
    marginLeft: theme.spacing(9)
  },
  forthLeft: {
    marginLeft: theme.spacing(2)
  }
}));

function TextFields() {
  const classes = useStyles();

  return (
    <form className={classes.firstbox} noValidate autoComplete='off'>
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
        margin='normal'
        variant='outlined'
      />
    </form>
  );
}

function ImageButton() {
  const classes = useStyles();

  return (
    <div className={classes.secondbox}>
      <Button variant='contained' size='medium' color='primary'>
        画像を追加
      </Button>
      <h5 className={classes.thirdbox}>1枚追加できます</h5>
    </div>
  );
}

function Checkbox() {
  const classes = useStyles();

  return (
    <FormGroup required className={classes.forthbox}>
      <h2>タグを選択してください</h2>
      <FormControlLabel
        control={
          <CheckBox
            value='checkedA'
            color='primary'
            className={classes.firstLeft}
          />
        }
        label='#１年'
        labelPlacement='start'
      />
      <FormControlLabel
        control={
          <CheckBox
            value='checkedA'
            color='primary'
            className={classes.firstLeft}
          />
        }
        label='#２年'
        labelPlacement='start'
      />
      <FormControlLabel
        control={
          <CheckBox
            value='checkedB'
            color='primary'
            className={classes.firstLeft}
          />
        }
        label='#３年'
        labelPlacement='start'
      />
      <FormControlLabel
        control={
          <CheckBox
            value='checkedC'
            color='primary'
            className={classes.firstLeft}
          />
        }
        label='#４年'
        labelPlacement='start'
      />
      <FormControlLabel
        control={
          <CheckBox
            value='checkedD'
            color='primary'
            className={classes.firstLeft}
          />
        }
        label='#５年'
        labelPlacement='start'
      />
      <FormControlLabel
        control={
          <CheckBox
            value='checkedE'
            color='primary'
            className={classes.secondLeft}
          />
        }
        label='#前期中間'
        labelPlacement='start'
      />
      <FormControlLabel
        control={
          <CheckBox
            value='checkedF'
            color='primary'
            className={classes.secondLeft}
          />
        }
        label='#前期期末'
        labelPlacement='start'
      />
      <FormControlLabel
        control={
          <CheckBox
            value='checkedG'
            color='primary'
            className={classes.secondLeft}
          />
        }
        label='#後期中間'
        labelPlacement='start'
      />
      <FormControlLabel
        control={
          <CheckBox
            value='checkedH'
            color='primary'
            className={classes.thirdLeft}
          />
        }
        label='#年度末'
        labelPlacement='start'
      />
    </FormGroup>
  );
}

function OtherButtons() {
  const classes = useStyles();
  return (
    <div className={classes.fifthbox}>
      <Button variant='contained' size='medium' color='secondary'>
        キャンセル
      </Button>
      <Button variant='contained' color='primary' className={classes.button}>
        送信
        <SendIcon className={classes.forthLeft}></SendIcon>
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

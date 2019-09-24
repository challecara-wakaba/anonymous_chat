import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  TextField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  fab: {
    margin: theme.spacing(1)
  }
}));

function TextFields() {
  const classes = useStyles();
  return (
    <form className={classes.container} noValidate autoComplete='off'>
      <TextField
        required
        id='outlined-required'
        label='題名'
        placeholder='過去問　[2]-(1) 力のモーメント'
        className={classes.TextField}
        margin='normal'
        variant='outlined'
      />
      <TextField
        multiline
        id='outlined-multilined-static'
        label='質問内容'
        placeholder='(例)この問題の解き方がわかりません'
        rows='6'
        classname={classes.TextField}
        margin='normal'
        variant='outlined'
      />
    </form>
  );
}
function RegisterButton() {
  const classes = useStyles();
  return (
    <div>
      <Fab color='primary' aria-label='add' className={classes.fab}>
        <AddIcon />
      </Fab>
    </div>
  );
}

export default function MakeThreadForm() {
  return (
    <div>
      <TextFields />
      <RegisterButton />
    </div>
  );
}

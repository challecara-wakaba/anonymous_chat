import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles(theme => ({
  root: ({ isSelected }) => ({
    height: '45px',
    backgroundColor: isSelected ? theme.primary : theme.background,
    '&:focus': {
      backgroundColor: isSelected ? theme.primary : theme.background
    }
  }),
  text: {
    color: theme.text
  }
}));

export default function SideMenuItem(props) {
  const { isSelected, name, id } = props;
  const classes = useStyles({ isSelected });

  return (
    <Link to={`/client/${id}`} style={{ textDecoration: 'none' }}>
      <ListItem button component='li' className={classes.root}>
        <Typography variant='body1' className={classes.text}>
          {`# ${name}`}
        </Typography>
      </ListItem>
    </Link>
  );
}

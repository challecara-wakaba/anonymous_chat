import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddAlertIcon from '@material-ui/icons/AddAlert';

const useStyle = makeStyles(theme => ({
  ButtonCont: ({ isKininaruClicked }) => ({
    display: 'inline-flex',
    border: 'solid thin #95E8B8',
    backgroundColor: isKininaruClicked ? '#95E8B8' : '#FFFFFF',
    height: '24px',
    minWidth: '48px',
    padding: 'unset',
    marginTop: '6px',
    '&:hover': {
      borderColor: '#95E8B8',
      backgroundColor: isKininaruClicked ? '#95E8B8' : '#FFFFFF'
    }
  }),
  IconCont: ({ isKininaruClicked }) => ({
    height: '16px',
    color: isKininaruClicked ? '#FFFFFF' : '#95E8B8',
    width: '20px'
  })
}));

const KininaruButton = props => {
  const { isKininaruClicked, onClick } = props;
  const classes = useStyle({ isKininaruClicked });
  return (
    <Button className={classes.ButtonCont} onClick={onClick}>
      <AddAlertIcon className={classes.IconCont} />
    </Button>
  );
};

export default KininaruButton;

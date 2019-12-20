import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddAlertIcon from '@material-ui/icons/AddAlert';

const useStyle = makeStyles(theme => ({
  ButtonCont: ({ isKininaruClicked }) => ({}),
  IconCont: ({ isKininaruClicked }) => ({
    color: 'black'
  })
}));

const KininaruButton = props => {
  const { className, isKininaruClicked } = props;
  const classes = useStyle({ isKininaruClicked });
  return (
    <div className={className}>
      <IconButton size='small' edge='start' className={classes.ButtonCont}>
        <AddAlertIcon className={classes.IconCont} />
      </IconButton>
    </div>
  );
};

export default KininaruButton;

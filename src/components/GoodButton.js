import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

export default function GoodButton() {
  return (
    <Button>
      <ThumbUpIcon />
    </Button>
  );
}

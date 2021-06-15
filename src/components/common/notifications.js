import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import {notificationSelector , setNotificationTimeout} from '../../redux/notifications/ducks';

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector(notificationSelector);
 
  const handleClose = () => dispatch(setNotificationTimeout());

  return (
    <>
    <Snackbar open={notification.show} autoHideDuration={5000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={notification.type}>
        {notification.message}
      </Alert>
    </Snackbar>
  
    </>
  );
};

export default Notification;

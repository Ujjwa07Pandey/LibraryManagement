import { AppBar,  Toolbar, Typography, Box, IconButton } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { modalOpenState, modalBodyState, setLoginSelector, signOutUser, setUser } from '../../redux/users/ducks';

const DesktopHeader = () => {
  const dispatch = useDispatch();
  const islogin = useSelector(setLoginSelector);
  let history = useHistory();
  return (
    <AppBar position='static'>
      <Toolbar>
        <Box display='flex' flexDirection='row' justifyContent='space-between' flexGrow={1}>
          <Typography variant='h4'>Library</Typography>
          {islogin ? (
            <Box display='flex' flexDirection='row' justifyContent='space-between'>
              <Typography
                variant='h6'
                style={{ margin: '0rem 1rem', padding: '0.5rem 0', cursor: 'pointer' }}
                onClick={() => {
                  history.push('/dashboard');
                }}
              >
                Dashboard
              </Typography>
             
               
                <IconButton aria-label="delete"   style={{ margin: '0rem 1rem', padding: '0.5rem 0', cursor: 'pointer' }} onClick={() => {
                  dispatch(signOutUser());
                  dispatch(setUser(null, false));
                }}>
                <PowerSettingsNewIcon style={{color:'#fff'}} fontSize="large"/>
        </IconButton>
             
            </Box>
          ) : (
            <Box display='flex' flexDirection='row' justifyContent='space-between'>
              <Typography
                variant='h6'
                style={{ margin: '0rem 1rem', padding: '0.5rem 0', cursor: 'pointer' }}
                onClick={() => {
                  dispatch(modalOpenState(true));
                  dispatch(modalBodyState('signup'));
                }}
              >
                SignUp
              </Typography>
              <Typography
                variant='h6'
                style={{ margin: '0rem 1rem', padding: '0.5rem 0', cursor: 'pointer' }}
                onClick={() => {
                  dispatch(modalOpenState(true));
                  dispatch(modalBodyState('login'));
                }}
              >
                Login
              </Typography>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default DesktopHeader;

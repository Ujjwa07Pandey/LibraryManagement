import { Box, Button, Typography } from '@material-ui/core';
import Layout from '../components/navigation/Layout';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch} from 'react-redux';

import { modalBodyState , modalOpenState } from './../redux/users/ducks';

const useStyles = makeStyles(() => ({
  cover: {
    height: '85vh',
    backgroundImage: `url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=841&q=80')`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
}));
const Landing = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <Layout>
      <Box className={classes.cover} display="flex"  justifyContent="center" alignItems="center">
        <Box  maxWidth={900} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Typography variant="h2" style={{color:'#fff'}} align="center">
          Welcome to Library Management System
      </Typography>
        <Button variant="contained" color="primary" style={{margin:'1rem 0rem'}} onClick = {() => {
              dispatch(modalOpenState(true));
              dispatch(modalBodyState('login'));
             }}>
       Lets get started
      </Button>
        </Box>
      
      </Box>
    </Layout>
  );
};

export default Landing;

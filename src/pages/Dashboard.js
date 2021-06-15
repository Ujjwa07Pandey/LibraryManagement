import {useState} from 'react';
import Layout from '../components/navigation/Layout';
import { Box, Button, Container, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { setUserSelector } from '../redux/users/ducks';

import AuthorsPage from './AuthorsPage';
import BooksPage from './BooksPage';
const Dashboard = () => {
  const user = useSelector(setUserSelector);
  const [active , setActive] = useState('authors');
  return (
    <Layout>
      <Container>
        <Box my='2rem'>
          <Typography variant='h4' gutterBottom>Welcome <span style={{color:'#007FFF'}}>{user === null || user === undefined ?  'User' :  user.name}</span> to your dashboard !!!</Typography>
         
        </Box>
        <Typography variant='h4' gutterBottom>Manage By</Typography>
        <Box my='1.5rem' display="flex" flexDirection="row" justifyContent="space-between" maxWidth={220}>
        <Button variant={active === 'authors' ? 'contained' : 'outlined'} color="primary"  onClick = {() => setActive('authors')}>
  Authors
</Button>  <Button variant={active === 'books' ? 'contained' : 'outlined'} color="primary"  onClick = {() => setActive('books')}>
  Books
</Button>
        </Box>
        {active === 'authors' ? <AuthorsPage/> : <BooksPage/>}
        
      </Container>
    </Layout>
  );
};

export default Dashboard;

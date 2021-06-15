import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography, useMediaQuery } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import AuthorCard from './../components/common/authorCard';
import firebase from 'firebase/app';
import { useDispatch } from 'react-redux';
import { modalBodyState, modalOpenState } from './../redux/users/ducks';
import { setAction } from './../redux/authors/ducks';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

const AuthorsPage = () => {
  const [authors, setAuthors] = useState([]);
  const [view, setView] = useState('list');
  let [count, setCount] = useState(6);
  const dispatch = useDispatch();
  const mobile = useMediaQuery((theme) => theme.breakpoints.down('xs'));
  useEffect(() => {

  },);
  useEffect(() => {
    firebase
      .firestore()
      .collection('authors')
      .orderBy('createdAt')
      .limit(count)
      .onSnapshot((querySnapshot) =>
        setAuthors(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, [count]);

  const handleChange = (event, nextView) => {
    setView(nextView);
  };
  return (
    <Box display='flex' flexDirection='column' my='2rem'>
      <Button
        variant='outlined'
        color='primary'
        style={{ margin: '1rem 0rem' }}
        onClick={() => {
          dispatch(modalOpenState(true));
          dispatch(modalBodyState('author'));
          dispatch(setAction('ADD'));
        }}
      >
        <AddIcon />
      </Button>
      {!mobile && (
        <ToggleButtonGroup
          orientation='horizontal'
          value={view}
          exclusive
          onChange={handleChange}
          style={{ justifyContent: 'flex-end' }}
        >
          <ToggleButton value='list' aria-label='list'>
            <ViewListIcon />
          </ToggleButton>
          <ToggleButton value='grid' aria-label='module'>
            <ViewModuleIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      )}

      {authors.length === 0 ? (
        <Typography variant='h5' gutterBottom align='center' style={{ margin: '2.5rem 0rem' }}>
          No authors Found
         
        </Typography>
      ) : (
        <>
          {view === 'list' ? (
            <Box>
              {authors.map((author) => (
                <AuthorCard author={author.data} id={author.id} view={view} />
              ))}
            </Box>
          ) : (
            <Grid container spacing={3}>
              {authors.map((author) => (
                <Grid item lg={4} md={6} sm={12} xs={12}>
                  <AuthorCard author={author.data} id={author.id} view={view} />
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}

      <Button variant='contained' color='primary' onClick={() => setCount((count = count + 6))}>
        Load More
      </Button>
    </Box>
  );
};

export default AuthorsPage;

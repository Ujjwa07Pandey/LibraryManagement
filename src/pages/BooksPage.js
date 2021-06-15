import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography, useMediaQuery } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import BookCard from './../components/common/bookCard';
import firebase from 'firebase/app';
import { useDispatch } from 'react-redux';
import { modalBodyState, modalOpenState } from './../redux/users/ducks';
import { setAction } from './../redux/books/ducks';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [view, setView] = useState('list');
  let [count, setCount] = useState(6);
  const dispatch = useDispatch();
  const mobile = useMediaQuery((theme) => theme.breakpoints.down('xs'));
  useEffect(() => {
    firebase
      .firestore()
      .collection('books')
      .orderBy('createdAt')
      .limit(count)
      .onSnapshot((querySnapshot) =>
        setBooks(
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
          dispatch(modalBodyState('book'));
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

      {books.length === 0 ? (
        <Typography variant='h5' gutterBottom align='center' style={{ margin: '2.5rem 0rem' }}>
           No authors Found
         
        </Typography>
      ) : (
        <>
          {view === 'list' ? (
            <Box>
              {books.map((book) => (
                <BookCard book={book.data} id={book.id} view={view} />
              ))}
            </Box>
          ) : (
            <Grid container spacing={3}>
              {books.map((book) => (
                <Grid item lg={4} md={6} sm={12} xs={12}>
                  <BookCard book={book.data} id={book.id} view={view} />
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

export default BooksPage;

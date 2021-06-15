import React, { useEffect, useState } from 'react';
import Layout from '../components/navigation/Layout';
import { useParams } from 'react-router-dom';
import firebase from 'firebase/app';

import { Button, Container, Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { modalBodyState, modalOpenState } from './../redux/users/ducks';
import { setAction, setBookIdSelector } from './../redux/books/ducks';
import { useDispatch, useSelector } from 'react-redux';

import BookCard from './../components/common/bookCard';


const AuthorPage = () => {
  let { id } = useParams();
  const [author, setAuthor] = useState(null);
  const bookId = useSelector(setBookIdSelector);
  
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchAuthor() {
      setAuthor(
        await firebase
          .firestore()
          .collection('authors')
          .doc(id)
          .get()
          .then((doc) => doc.data())
      )
    }
    fetchAuthor();
  });
  useEffect(() => {
    async function addAuthorCollection() {
      
      firebase
        .firestore()
        .collection('authors')
        .doc(id)
        .update({
          books: firebase.firestore.FieldValue.arrayUnion(bookId),
        });

      firebase
        .firestore()
        .collection('books')
        .doc(bookId)
        .update({
          authors: firebase.firestore.FieldValue.arrayUnion(id),
        });
    }
    if (bookId != null) {
      addAuthorCollection();
    }
  }, [bookId , id]);

 


  

  return (
    <Layout>
      <Container style={{ minHeight: '82vh' }}>
        {author === null ? (
          <Box display='flex' justifyContent='center' alignItems='center' py='5rem'>
            <Typography variant='h4' gutterBottom align='center'>
              Loading....
            </Typography>
          </Box>
        ) : (
          <Box my={'2rem'}>
            <Typography variant='h4' gutterBottom align='left' style={{ color: '#007FFF', margin: '1rem 0rem' }}>
              Author Name
            </Typography>
            <Typography variant='h5' gutterBottom align='left'>
              {author.name}
            </Typography>
            <Typography variant='h4' gutterBottom align='left' style={{ color: '#007FFF', margin: '2.5rem 0rem' }}>
              About Author {bookId}
            </Typography>
            <Typography variant='body1' gutterBottom align='left'>
              {author.desc}
            </Typography>
            <Typography variant='h4' gutterBottom align='left' style={{ color: '#007FFF', margin: '2.5rem 0rem' }}>
              Books{bookId}
            </Typography>
            <Box display='flex' flexDirection='column'>
              <Button
                variant='outlined'
                color='primary'
                onClick={() => {
                  dispatch(modalOpenState(true));
                  dispatch(modalBodyState('book'));
                  dispatch(setAction('ADD'));
                }}
              >
                Add Book
              </Button>
              {author.books.length === 0 ? (
                <Typography variant='h5' gutterBottom align='center' style={{ margin: '2.5rem 0rem' }}>
                  No books found
                </Typography>
              ) : (
                <Box>
                  {author.books.map((id) => (

                   <FetchBook id={id} />
                  ))}
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Container>
    </Layout>
  );
};

const FetchBook =  ({id}) => {

  const [book ,setBook] = useState(null);

  useEffect(() => {
    async function fetchData () {
      setBook(await firebase.firestore().collection('books').doc(id).get().then((doc) => 
        doc.data()
       
  
      ))
    }
    fetchData();

  });

     return (
       <>
       { book !== null ? (<BookCard book={book} id={id} view="list" isDelete={false}/>)  : (<></>)}
       </>
     
     )
}

export default AuthorPage;

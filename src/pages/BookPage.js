import React, { useEffect, useState } from 'react';
import Layout from '../components/navigation/Layout';
import { useParams } from 'react-router-dom';
import firebase from 'firebase/app';
import {useDispatch , useSelector} from 'react-redux';
import { Button, Container, Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { modalBodyState, modalOpenState } from './../redux/users/ducks';
import { setAction, setAuthorIdSelector } from './../redux/authors/ducks';
import AuthorCard from './../components/common/authorCard';

const BookPage = () => {
  let { id } = useParams();
  const [book, setBook] = useState(null);
  const authorId = useSelector(setAuthorIdSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchBook() {
      setBook(
        await firebase
          .firestore()
          .collection('books')
          .doc(id)
          .get()
          .then((doc) => doc.data())
      );
    }
    fetchBook();
  });
  useEffect(() => {
    async function addAuthorCollection() {
      firebase
        .firestore()
        .collection('books')
        .doc(id)
        .update({
          authors: firebase.firestore.FieldValue.arrayUnion(authorId),
        });

        firebase
        .firestore()
        .collection('authors')
        .doc(authorId)
        .update({
          books: firebase.firestore.FieldValue.arrayUnion(id),
        });
    }
    if (authorId != null) {
      addAuthorCollection();
    }
  }, [authorId , id]);
  return (
    <Layout>
      <Container style={{ minHeight: '82vh' }}>
        {book === null ? (
          <Box display='flex' justifyContent='center' alignItems='center' py='5rem'>
            <Typography variant='h4' gutterBottom align='center'>
              Loading....
            </Typography>
          </Box>
        ) : (
          <Box my={'2rem'}>
            <Typography variant='h4' gutterBottom align='left' style={{ color: '#007FFF', margin: '1rem 0rem' }}>
              Book Name
            </Typography>
            <Typography variant='h5' gutterBottom align='left'>
              {book.name}
            </Typography>
            <Typography variant='h4' gutterBottom align='left' style={{ color: '#007FFF', margin: '2.5rem 0rem' }}>
              About Book {authorId}
            </Typography>
            <Typography variant='body1' gutterBottom align='left'>
              {book.desc}
            </Typography>
            <Typography variant='h4' gutterBottom align='left' style={{ color: '#007FFF', margin: '2.5rem 0rem' }}>
              Authors
            </Typography>
            <Box display='flex' flexDirection='column'>
              <Button variant='outlined' color='primary'   onClick={() => {
                  dispatch(modalOpenState(true));
                  dispatch(modalBodyState('author'));
                  dispatch(setAction('ADD'));
                }}>
                Add Author
              </Button>
              {book.authors.length === 0 ? (
                <Typography variant='h5' gutterBottom align='center' style={{ margin: '2.5rem 0rem' }}>
                  No Authors found
                </Typography>
              ) : (
                <Box>
                  {book.authors.map((id) => (
                   <FetchAuthor id={id}/>
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
const FetchAuthor =  ({id}) => {

  const [author ,setAuthor] = useState(null);

  useEffect(() => {
    async function fetchData () {
      setAuthor(await firebase.firestore().collection('authors').doc(id).get().then((doc) => 
        doc.data()
       
  
      ))
    }
    fetchData();

  });

     return (
       <>
       { author !== null ? (<AuthorCard author={author} id={id} view="list" isDelete={false}/>)  : (<></>)}
       </>
     
     )
}

export default BookPage;

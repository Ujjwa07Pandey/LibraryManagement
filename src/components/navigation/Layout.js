import React from 'react';
import { Box } from '@material-ui/core';
import Header from './Header';
import Footer from './Footer';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useSelector } from 'react-redux';
import { modalOpenSelector, modalBodySelector } from './../../redux/users/ducks';
import { setAuthorSelector, setAuthorIdSelector, setActionSelector } from './../../redux/authors/ducks';
import Notification from './../common/notifications';
import SignupModal from './../common/signupModal';
import LoginModal from '../common/loginModal';
import AuthorModal from '../common/authorModal';
import BookModal from '../common/bookModal';
import { setBookIdSelector, setBookSelector } from '../../redux/books/ducks';
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
const Layout = ({ children }) => {
  const classes = useStyles();
  const open = useSelector(modalOpenSelector);
  const item = useSelector(modalBodySelector);

  const author = useSelector(setAuthorSelector);
  const authorId = useSelector(setAuthorIdSelector);
  
  const book = useSelector(setBookSelector);
  const bookId = useSelector(setBookIdSelector);
 
  const setAction = useSelector(setActionSelector);
 
  return (
    <Box>
      <Header />
      <main>
        {children}
        <Modal
          aria-labelledby='transition-modal-title'
          aria-describedby='transition-modal-description'
          className={classes.modal}
          open={open}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            {item === 'signup' ? (
              <SignupModal />
            ) : item === 'login' ? (
              <LoginModal />
            ) : item === 'author' && author !== null ? (
              <AuthorModal name={author.name} desc={author.desc} id={authorId} />
            ) : item === 'author' && setAction === 'ADD' ? (
              <AuthorModal />
            ) : item === 'book' && book !== null ? (
                <BookModal name={book.name} desc={book.desc} id={bookId} />
            ) : item === 'book' && setAction === 'ADD' ? (
                <BookModal />
            ) : (
              <h1>loading..</h1>
            )}
          </Fade>
        </Modal>
      </main>
      <Notification />
      <Footer />
    </Box>
  );
};

export default Layout;

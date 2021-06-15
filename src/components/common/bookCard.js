import { Card, CardActions, CardContent, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';
import { modalBodyState, modalOpenState } from '../../redux/users/ducks';
import { setAction, readBook, deleteBook } from '../../redux/books/ducks';
import clsx from 'clsx';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  listCard: {
    display: 'flex',
    flexDirection: 'row ',
    height:'120px',
    justifyContent: 'space-around',
    margin: '1.5rem 0rem',
    padding: '0rem 2rem',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      height:'270px'
    },
  },
  verticalCard: {
    display: 'flex',
    flexDirection: 'column',
    height:'270px',
    justifyContent: 'space-around',
    margin: '1rem 0rem',
    padding: '0rem 2rem',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
}));

const BookCard = ({ book, id, view , isDelete = true}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  return (
    <Card className={clsx(view === 'list' ? classes.listCard : classes.verticalCard)}>
      <CardContent style={{ flexGrow: 1 , margin:'1rem 0rem' , textDecoration:'none' , color:'#000'}} component={Link} to={`/books/${id}`}>
        <Typography variant='h5' gutterBottom>
          {book.name}
        </Typography>
        <Typography variant='body1' gutterBottom>
          {book.desc !== null ? book.desc.split('').slice(0, 120) : book.desc }
        </Typography>
      </CardContent>
      {isDelete && <CardActions style={{ justifyContent: 'center' }}>
        <IconButton component={Link} to={`/books/${id}`}>
          <VisibilityIcon fontSize='medium' />
        </IconButton>

        <IconButton
          onClick={() => {
            dispatch(setAction('EDIT'));
            dispatch(readBook(id));
            dispatch(modalOpenState(true));
            dispatch(modalBodyState('book'));
          }}
        >
          <EditIcon fontSize='medium' />
        </IconButton>
        <IconButton
          onClick={() => {
            dispatch(deleteBook(id));
          }}
        >
          <DeleteIcon fontSize='medium' />
        </IconButton>
      </CardActions>}
      
    </Card>
  );
};

export default BookCard;

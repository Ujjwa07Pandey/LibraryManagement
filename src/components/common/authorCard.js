import { Card, CardActions, CardContent, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';
import { modalBodyState, modalOpenState } from '../../redux/users/ducks';
import { setAction, readAuthor, deleteAuthor } from '../../redux/authors/ducks';
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

const AuthorCard = ({ author, id, view , isDelete = true }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  return (
    <Card className={clsx(view === 'list' ? classes.listCard : classes.verticalCard)}>
      <CardContent style={{ flexGrow: 1 , margin:'1rem 0rem' , textDecoration:'none' , color:'#000'}} component={Link} to={`/authors/${id}`}>
        <Typography variant='h5' gutterBottom>
          {author.name}
        </Typography>
        <Typography variant='body1' gutterBottom>
          {author.desc !== null ? author.desc.split('').slice(0, 120) : author.desc }
        </Typography>
      </CardContent>
      {isDelete &&   <CardActions style={{ justifyContent: 'center' }}>
        <IconButton component={Link} to={`/authors/${id}`}>
          <VisibilityIcon fontSize='medium' />
        </IconButton>

        <IconButton
          onClick={() => {
            dispatch(setAction('EDIT'));
            dispatch(readAuthor(id));
            dispatch(modalOpenState(true));
            dispatch(modalBodyState('author'));
          }}
        >
          <EditIcon fontSize='medium' />
        </IconButton>
        <IconButton
          onClick={() => {
            dispatch(deleteAuthor(id));
          }}
        >
          <DeleteIcon fontSize='medium' />
        </IconButton>
      </CardActions>}
    
    </Card>
  );
};

export default AuthorCard;

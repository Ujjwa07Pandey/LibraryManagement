import { Card, CardContent, Typography, Box, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik  } from 'formik';


import CloseIcon from '@material-ui/icons/Close';
import { useDispatch  , useSelector} from 'react-redux';
import {modalOpenState} from '../../redux/users/ducks';

import {addBook , setActionSelector , updateBook , setBookNull} from './../../redux/books/ducks';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 575,
    padding:'1rem 2rem',
    [theme.breakpoints.down('sm')]: {
      minWidth: 275,
    },
  },
  links:{
    color: '#007FFF',
    cursor:'pointer'
  }
}));
const BookModal = ({ name = null , desc = null  , id = null}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const action = useSelector(setActionSelector);
  
  const formik = useFormik({
    initialValues: {
     
        
      name: name,
      desc: desc,
      
    },
   
    onSubmit: (values) => {
    if(action === 'ADD'){
      dispatch(addBook(values));
     
    }
   else{
     dispatch(updateBook(id , values));
   }
      formik.resetForm();
     
     
    },
  });

  return (
    <Card className={classes.root}>
      
      <CardContent>
        <Box display="flex" flexDirection="row">
          <Box flexGrow={1}> <Typography variant='h4' gutterBottom align="center">
            {action === 'ADD' ? 'Add Book' : 'Edit Book'}
       
      </Typography></Box>
     
      <span style={{float:'right'}}>
        <CloseIcon onClick={() => {
          dispatch(modalOpenState(false));
          dispatch(setBookNull());
        }
          }/>
      </span>
      </Box>
        <form onSubmit={formik.handleSubmit}>
          <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
            <TextField
              margin={'normal'}
              label={'Book Name'}
              name={'name'}
              id={'name'}
              required
              type={'text'}
              placeholder="Eg: The Alchemist"
              variant={'outlined'}
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              fullWidth
            />

            <TextField
              multiline={true}
              rows={3}
              margin={'normal'}
              label={'Description'}
              name={'desc'}
              id={'desc'}
              required
              type={'text'}
              variant={'outlined'}
            
              placeholder="Eg: The Alchemist by Paulo Coelho continues to change the lives of its readers forever. With more than two million copies sold around the world, The Alchemist has established itself as a modern classic, universally admired."
              value={formik.values.desc}
              onChange={formik.handleChange}
              error={formik.touched.desc && Boolean(formik.errors.desc)}
              helperText={formik.touched.desc && formik.errors.desc}
              fullWidth
            />
  
          

            <Button color={'primary'} type={'submit'} variant={'contained'} style={{margin:'0.5rem 0rem'}}>
            {action === 'ADD' ? 'Add' : 'Edit'}
            </Button>
          
    
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookModal;

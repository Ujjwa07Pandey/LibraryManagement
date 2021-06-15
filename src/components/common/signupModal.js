import { Card, CardContent, Typography, Box, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik  } from 'formik';
import { validationSchema } from '../../utils/string_utils';

import CloseIcon from '@material-ui/icons/Close';
import { useDispatch } from 'react-redux';
import {modalOpenState , modalBodyState, signUpUser} from '../../redux/users/ducks';


const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    padding:'1rem 2rem'
  },
  links:{
    color: '#007FFF',
    cursor:'pointer'
  }
}));
const SignupModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  
  const formik = useFormik({
    initialValues: {
      email: '',
      phone: '',
      password: '',
      name: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
    
      dispatch(signUpUser(values));
      formik.resetForm();
     
     
    },
  });

  return (
    <Card className={classes.root}>
      
      <CardContent>
        <Box display="flex" flexDirection="row">
          <Box flexGrow={1}> <Typography variant='h4' gutterBottom align="center" >
        SignUp 
      </Typography></Box>
     
      <span style={{float:'right'}}>
        <CloseIcon onClick={() => dispatch(modalOpenState(false))}/>
      </span>
      </Box>
        <form onSubmit={formik.handleSubmit}>
          <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
            <TextField
              margin={'normal'}
              label={'Name'}
              name={'name'}
              id={'name'}
              required
              type={'text'}
              variant={'outlined'}
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              fullWidth
            />

            <TextField
              margin={'normal'}
              label={'Email'}
              name={'email'}
              id={'email'}
              required
              type={'email'}
              variant={'outlined'}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              fullWidth
            />

            <TextField
              margin={'normal'}
              label={'Contact Number'}
              name={'phone'}
              id={'phone'}
              required
              type={'number'}
              variant={'outlined'}
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              fullWidth
            />

            <TextField
              id={'password'}
              margin={'normal'}
              label={'Password'}
              name={'password'}
              type={'password'}
              required
              variant={'outlined'}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              fullWidth
            />

            <Button color={'primary'} type={'submit'} variant={'contained'} style={{margin:'0.5rem 0rem'}}>
              Submit
            </Button>
            <Typography variant='body1' gutterBottom align="center" >
        Already have a account ? 
      </Typography>
      <Typography variant='body2' gutterBottom align="center" >
       <span className={classes.links} onClick={() => dispatch(modalBodyState('login'))}>Login</span> 
      </Typography>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignupModal;

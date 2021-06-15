import { Card, CardContent, Typography, Box, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import { loginvalidationSchema } from '../../utils/string_utils';

import CloseIcon from '@material-ui/icons/Close';
import { useDispatch } from 'react-redux';
import { modalOpenState, modalBodyState, loginUser, forgotPasswordUser } from '../../redux/users/ducks';





const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    padding: '1rem 2rem',
  },
  links: {
    color: '#007FFF',
    cursor: 'pointer',
  },
}));
const LoginModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  
 
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginvalidationSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values.email, values.password));

      formik.resetForm();
      
    
    },
  });

  return (
    <Card className={classes.root}>
      <CardContent>
        <Box display='flex' flexDirection='row'>
          <Box flexGrow={1}>
            {' '}
            <Typography variant='h4' gutterBottom align='center'>
              Login
            </Typography>
          </Box>

          <span style={{ float: 'right' }}>
            <CloseIcon onClick={() => dispatch(modalOpenState(false))} />
          </span>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
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

            <Button color={'primary'} type={'submit'} variant={'contained'} style={{ margin: '0.5rem 0rem' }}>
              Submit
            </Button>
            <Typography variant='body1' gutterBottom align='center'>
              Don't have a account ?
            </Typography>
            <Typography variant='body2' gutterBottom align='center'>
              <span className={classes.links} onClick={() => dispatch(modalBodyState('signup'))}>
                SignUp
              </span>
            </Typography>
            <Typography variant='body2' gutterBottom align='center'>
              <span className={classes.links} onClick={() => dispatch(forgotPasswordUser(formik.values.email))}>
                Forgot Password ?
              </span>
            </Typography>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginModal;

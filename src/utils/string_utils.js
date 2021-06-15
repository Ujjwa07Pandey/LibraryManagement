import * as yup from 'yup';
export const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const validationSchema = yup.object({
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  phone: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  name: yup
    .string()
    .min(2, 'Name must be atleast 3 charcters')
    .max(50, 'Name cannot exceed 50 characters')
    .required('Required'),
  password: yup.string().required(' Password Required'),
  
});
export const loginvalidationSchema = yup.object({
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
 
 
  password: yup.string().required(' Password Required'),
  
});

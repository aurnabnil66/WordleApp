import * as yup from 'yup';

export const logInFormValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email Address is required')
    .test(
      'starts-with-lowercase',
      'Email must start with a lowercase letter',
      value => (value ? /^[a-z]/.test(value) : true), // Check if it starts with a lowercase letter
    )
    .test(
      'contains-at',
      'Email must contain "@"',
      value => (value ? /@/.test(value) : true), // Check if it contains the "@" symbol
    )
    .test(
      'valid-email-format',
      'Invalid email format',
      value =>
        value
          ? /^[a-z][a-z0-9._%+-]*@[a-z0-9.-]+\.[a-z]{2,}$/.test(value)
          : true, // Full email format validation as a fallback
    ),
  password: yup
    .string()
    .required('Password is required')
    .min(4, 'Password must contain at least 8 characters'),
});

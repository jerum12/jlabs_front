import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../reducers/authSlice';

const Login = () => {
 const navigate = useNavigate();
 const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const [hasError, setHasError] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {

      dispatch(loginUser(formData)).then((userData) => {
        //Redirect based on userType
      //  console.log("userData",userData);
        if (userData && userData.user_type === 'Seller') {
        //  console.log('hereSeller')
          navigate('/sellerHome'); // Redirect to seller home page
        } else  if (userData && userData.user_type === 'Customer') {
          //console.log('hereCustomer')
          navigate('/customerHome'); // Redirect to customer home page
        }else{
          console.log('error');
        }
       // console.log('Login Successful!', userData);
        })
        .catch((error) => {
          console.error('Login failed:', error.response.data.message);
          setHasError(error.response.data.message);
          setErrors({});
          // Handle registration failure if needed
        });

      // Registration logic would go here (e.g., API call to register user)
      // For demo, simulate registration success and redirect
  

    
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = (data) => {
    let errors = {};


    if (!data.email) {
      errors.email = 'Email is required!';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Email address is invalid!';
    }

    if (!data.password) {
      errors.password = 'Password is required!';
    } 

    return errors;
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        {hasError &&
            <Alert severity="error">{hasError}</Alert>
        }
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            color="primary"
          >
            Login
          </Button>
        </Box>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Don't have an account? <Link to="/register">Register</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;

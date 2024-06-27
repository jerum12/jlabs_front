import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, FormControl, InputLabel, Select, MenuItem, FormHelperText, Alert } from '@mui/material';

import { Link, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { registerUser } from '../reducers/authSlice';
const Register = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [hasError, setHasError] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    user_type: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      // Registration logic would go here (e.g., API call to register user)

      // For demo, simulate registration success and redirect
      dispatch(registerUser(formData)).then((userData) => {
      //Redirect based on userType
     // console.log("userData",userData);
      if (userData && userData.user_type === 'Seller') {
       // console.log('hereSeller')
        navigate('/sellerHome'); // Redirect to seller home page
      } else  if (userData && userData.user_type === 'Customer') {
       // console.log('hereCustomer')
        navigate('/customerHome'); // Redirect to customer home page
      }else{
        //console.log('error');
      }
      //console.log('Registration Successful!', userData);
      })
      .catch((error) => {
        console.error('Registration failed:', error.response.data.message);
        setHasError(error.response.data.message);
        setErrors({});
        // Handle registration failure if needed
      });
     
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = (data) => {
    let errors = {};

    if (!data.name) {
      errors.name = 'Name is required!';
    }

    if (!data.email) {
      errors.email = 'Email is required!';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Email address is invalid!';
    }

    if (!data.password) {
      errors.password = 'Password is required!';
    } else if (data.password.length < 3) {
      errors.password = 'Password must be at least 3 characters!';
    }

    if (!data.confirmPassword) {
      errors.confirmPassword = 'Confirm Password is required!';
    } else if (data.password !== data.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match!';
    }

    if (!data.user_type) {
      errors.user_type = 'User type is required!';
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
          Register
        </Typography>
        {hasError &&
            <Alert severity="error">{hasError}</Alert>
        }
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
        <TextField
            margin="normal"
            fullWidth
            id="name"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
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
          <TextField
            margin="normal"
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
          <FormControl fullWidth margin="normal" error={!!errors.userType}>
            <InputLabel id="user_type-label">User Type</InputLabel>
            <Select
              labelId="user_type-label"
              id="user_type"
              name="user_type"
              value={formData.user_type}
              onChange={handleChange}
            >
              <MenuItem value="Seller">Seller</MenuItem>
              <MenuItem value="Customer">Customer</MenuItem>
            </Select>
            {errors.user_type && <FormHelperText>{errors.user_type}</FormHelperText>}
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            color="primary"
          >
            Register
          </Button>
        </Box>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account? <Link component="button" to="/login">Back to Login</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Button, Container, Paper, TextField, Grid, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { updateProfileUser, logout, fetchProfile } from '../reducers/authSlice'; // Adjust path as needed
import Map from './Map'; // Placeholder for map component
import { useNavigate } from 'react-router-dom';
import MapComponent from './MapComponent';

const CustomerHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user); // Assuming 'auth' slice in Redux store
//console.log('user',user);
  const [errors, setErrors] = useState({});

   // Local state to manage form data
   const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    user_type: user.user_type
  });

  useEffect(() => {
    dispatch(fetchProfile()); // Implement fetchProfile action if needed
  }, [dispatch]);


  const handleLogout = () => {
    dispatch(logout());
    // Redirect to login page after logout
    navigate('/login'); // Alternatively use useHistory from react-router-dom
  };

  const handleChange = (e) => {
       setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch action to update profile in Redux
    dispatch(updateProfileUser(user.id, formData));
  };

  const [hasMessage, setHasError] = useState(false);

  return (
    <Container maxWidth="lg">
       <Paper style={{ margin: 'auto', marginTop: 20, padding: 20 }}>
       <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h5" gutterBottom>
            Customer Profile
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginTop: 10 }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Grid>
      </Grid>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          margin="normal"
          disabled
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
          variant="contained"
          color="primary"
          style={{ marginTop: 10 }}
        >
          Save Changes
        </Button>
      </form>


      <Map /> {/* Display map component */}
      {/* Logout button */}
  
    </Paper>
   
    </Container>
  );
};

export default CustomerHome;

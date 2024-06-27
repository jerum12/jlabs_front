import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Container } from '@mui/material';
import { logout } from '../reducers/authSlice'; // Adjust path as needed
import {  useNavigate } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate.push('/login');
  };

  return (
    <Container maxWidth="md">
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
};

export default Logout;

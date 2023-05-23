import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/authContext';
import { useLocation } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { TextField, Button, Typography, Link, Box, Alert } from '@mui/material';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { authenticate } = useContext(AuthContext);
  const location = useLocation();
  
  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error message
  
    try {
      await authenticate(email, password);
      
      // Check if the previous page was /signin, and if so, navigate to home page
      let from = location.state?.from && location.state.from !== '/signin' ? location.state.from : '/';
      
      window.location.replace(from);
      
    } catch (error) {
      // Display an error message
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h4" mb={2}>Login</Typography>
      <form onSubmit={onSubmit}>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mb: 1 }}
        >
          Login
        </Button>
      </form>
      {errorMessage && (
        <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
          {errorMessage}
        </Alert>
      )}
      <Typography variant="body2" color="textSecondary">
        Don't have an account?
        <Link component={RouterLink} to="/signup" color="primary" sx={{ ml: 1 }}>
          Sign Up
        </Link>
      </Typography>
    </Box>
  );
};

export default SignInPage;

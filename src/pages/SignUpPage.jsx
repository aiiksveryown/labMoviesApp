import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/authContext';
import { TextField, Button, Typography, Link, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp } = useContext(AuthContext); // Access the signUp function from AuthContext
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const { user, error } = await signUp({ email, password, username });
    if (user) {
      // Navigate to a protected route or home page after successful sign-up
      navigate('/'); // Change this to the desired route
    } else {
      // Display an error message based on the error from signUp
      console.error('Error during sign-up:', error.message);
    }
  };

  return (
    <Box className="container mt-5" sx={{ width: '600px' }}>
      <Typography variant="h3">Sign Up</Typography>
      <form onSubmit={onSubmit} className="mt-3">
        <TextField
          fullWidth
          margin="normal"
          label="User Name"
          variant="outlined"
          value={username.toLowerCase().trim()}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email Address"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Typography variant="caption" color="text.secondary">
          Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.
        </Typography>
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </form>
      <Box textAlign="center" mt={2}>
        Already a User?
        <Link href="/login" underline="hover">
          <Typography variant="body2" color="primary" ml={1} display="inline">
            Login
          </Typography>
        </Link>
      </Box>
    </Box>
  );
};

export default SignUpPage;
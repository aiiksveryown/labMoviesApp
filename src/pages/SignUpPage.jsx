import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/authContext';
import { TextField, Button, Typography, Link, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState(null);
  const { register, isAuthenticated } = useContext(AuthContext); // Access the signUp function from AuthContext
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous error message
    try {
      const { user } = await register(email, password, firstName, lastName);
      console.log("resp", user);
      // If user registration is successful, navigate to the desired route
      navigate('/'); // Change this to the desired route
    } catch (error) {
      // Display an error message
      setError('Registration failed, please check your inputs and try again.');
    }
  };

  return (
    <Box className="container mt-5" sx={{ width: '600px' }}>
      <Typography variant="h3">Sign Up</Typography>
      <form onSubmit={onSubmit} className="mt-3">
        <TextField
          fullWidth
          margin="normal"
          label="First Name"
          variant="outlined"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Last Name"
          variant="outlined"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
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
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
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

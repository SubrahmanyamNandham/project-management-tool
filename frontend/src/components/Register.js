import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Card, Typography, Box, Snackbar, Alert } from '@mui/material';

export default function Register({onClose}){
  const [form, setForm] = useState({ email: '', password: '', role: 'User'});
  const [successOpen, setSuccessOpen] = useState(false);
  const [error, setError] = useState('');
  const [errorOpen, setErrorOpen] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post('https://project-management-api-5d48.onrender.com/api/auth/signup', form);
      setSuccessOpen(true);
       setTimeout(() => {
      onClose();
    }, 1000);
      setError('');
      console.log('Signup success:', res.data);
    } catch (err) {
      const msg = err.response?.data?.message || 'Signup failed';
      setError(msg);
      setErrorOpen(true);
    }
  };

  return (
    <>
      <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', backgroundColor: '#c4c0c0' }}>
        <Card sx={{ p: 3, maxWidth: 400, margin: 'auto' }}>
          <Typography variant="h5" gutterBottom>Sign up to create your account</Typography>
          <TextField name="email" label="Email" fullWidth margin="normal" onChange={handleChange} />
          <TextField name="password" label="Password" type="password" fullWidth margin="normal" onChange={handleChange} />
          <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleSignup}>Sign Up</Button>
        </Card>
      </Box>
      <Snackbar open={successOpen} autoHideDuration={3000} onClose={() => setSuccessOpen(false)}>
        <Alert severity="success" onClose={() => setSuccessOpen(false)}>Signup successful!</Alert>
      </Snackbar>
      <Snackbar open={errorOpen} autoHideDuration={4000} onClose={() => setErrorOpen(false)}>
        <Alert severity="error" onClose={() => setErrorOpen(false)}>{error}</Alert>
      </Snackbar>
    </>
  );
}

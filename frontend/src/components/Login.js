import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Card, Typography, Box, Snackbar, Alert, Dialog } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';
import Register from './Register';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post('https://project-management-api-5d48.onrender.com/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      window.location.href = '/dashboard'; // or route to your main app page
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed';
      setError(msg);
      setOpen(true);
    }
  };

  return (
    <>
      <Navbar />
      <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', backgroundColor: '#c4c0c0' }}>
        <Card sx={{ p: 3, maxWidth: 400, margin: 'auto' }}>
          <Typography variant="h5" gutterBottom>Login to your account</Typography>
          <TextField name="email" label="Email" fullWidth margin="normal" onChange={handleChange} />
          <TextField name="password" label="Password" type="password" fullWidth margin="normal" onChange={handleChange} />
          <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleLogin}>Login</Button>
         <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
              Don't have an account?{' '}
              <span
                style={{ color: '#1976d2', cursor: 'pointer' }}
                onClick={() => setSignupOpen(true)}
              >
                Sign up
              </span>
        </Typography>

        </Card>
      </Box>
      <Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)}>
        <Alert severity="error" onClose={() => setOpen(false)}>{error}</Alert>
      </Snackbar>
      <Dialog open={signupOpen} onClose={() => setSignupOpen(false)} fullWidth maxWidth="sm">
  <Register onClose={() => setSignupOpen(false)} />
</Dialog>
      <Footer />
    </>
  );
}


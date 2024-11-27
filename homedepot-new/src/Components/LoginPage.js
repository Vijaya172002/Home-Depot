import React, { useState } from 'react'
import { Grid, Paper, Typography, TextField, Button, Box, InputAdornment, Alert } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
// import axios from './AuthService';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';


function LoginPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [successAlert, setSuccessAlert] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 3; // Password must be at least 6 characters
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // Remove the error when user starts typing
    if (emailError) {
      setEmailError('');
    }
  };

  // Handle password input change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // Remove the error when user starts typing
    if (passwordError) {
      setPasswordError('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let isValid = true;

    // Clear previous errors
    setEmailError('');
    setPasswordError('');
    setError('');
    if (!email) {
      setEmailError('Email is required.')
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Invalid email format.');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required.')
      isValid = false;
    } else
      if (!validatePassword(password)) {
        setPasswordError('Password must be at least 4 characters.');
        isValid = false;
      }
    if (!isValid) {
      return; // Stop the form submission if validation fails
    }
    try {
      //  const response = await axios.post(`http://172.17.31.61:5107/api/Login?emailId=${email}&password=${password}`);

      const response = await axios.post('https://prod-74.eastus.logic.azure.com:443/workflows/cc4a98ded38a42b6a5db647cef54bcfe/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=DdQr2ilPdrhmeeiwK0UvxUBk2Tjb0vf_SEoldXV6jIA', {
        email,
        password
      });
      console.log(response);
      if(response.status === 200){
        setSuccessAlert(true);
        setTimeout(() => {
          navigate('/home/dashboard');
        }, 2000);
      }
      else{
        console.log("failed")
      }
      // if (response.status === 200) {
      //   localStorage.setItem('oauth2', response.data.token);
      //   localStorage.setItem('userRole', response.data.role);
      //   localStorage.setItem('userEmail', email);

      //   // Now you can retrieve the role
      //   const userRole = response.data.role;
      //   console.log('User role:', userRole);

      //   navigate('/home');
      // }

    } catch (err) {
      setError('Invalid Email or password.');
      console.error('Login error:', err);
    }
  };

  return (
    <div>
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          backgroundImage: 'url(https://helpdesk.miraclesoft.com/assets/images/bg-login.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {/* Center Container Box */}
        <Grid
          container
          component={Paper}
          elevation={6}
          sx={{
            zIndex: 2,
            width: { xs: '90%', md: '60%' },
            height: '70vh',
            display: 'flex',
            backgroundColor: 'transparent'
          }}
        >
          {/* Left Half - Welcome Section */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 170, 231, 0.4)',
              p: 3,
            }}
          >
            <Box sx={{ '& > *': { textAlign: 'center' } }}>
              <Typography variant="h4" sx={{ color: 'white', mb: 2 }}>
                Incident <br />Management System
              </Typography>
              <Typography variant="h6" sx={{ color: 'white' }}>
                Your Gateway to Efficient Incident Tracking and Resolution
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: 'white',
                mt: 'auto', // Push to the bottom of the box
                textAlign: 'center',
                display: 'inline', // Ensure inline layout
              }}
            >
              Built by{' '}
              <span
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                }}
              >
                Miracle
              </span>
            </Typography>
          </Grid>


          {/* Right Half - Login Section */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#232527',
              p: 3,
              flexDirection: 'column',
            }}
          >
            <Box sx={{ mb: 3 }}>
              <img src='https://firebasestorage.googleapis.com/v0/b/me-portal.appspot.com/o/Miraclelogo%2FMiracle-Logo-White.png?alt=media&token=284bfe57-14a0-49eb-823b-c891e2278d5e' alt="Miracle Logo" style={{ width: '160px' }} />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Typography variant="h5" sx={{ color: 'white', mb: 2 }}>
                Login to your account
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '80%' }}>
                <TextField
                  variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  placeholder="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={handleEmailChange}
                  error={Boolean(emailError)}
                  helperText={emailError}
                  InputProps={{
                    sx: { color: 'white' },
                    endAdornment: (
                      <InputAdornment position="start">
                        <AccountCircleOutlinedIcon sx={{ color: 'white' }} />
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{ style: { color: 'white' } }}
                />
                <TextField
                  variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  placeholder="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={handlePasswordChange}
                  error={Boolean(passwordError)}
                  helperText={passwordError}
                  InputProps={{
                    sx: { color: 'white' },
                    endAdornment: (
                      <InputAdornment position="start">
                        <HttpsOutlinedIcon sx={{ color: 'white' }} />
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{ style: { color: 'white' } }}
                />
                {error && (
                  <Typography color="error" variant="body2">
                    {error}
                  </Typography>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: '#00aae7', color: 'white' }}
                >
                  Login
                </Button>
                {/* Don't have an account link */}


                {/* Forgot Password and Sign In buttons */}
                {/* <Grid container spacing={2} >
                 
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="text"
                      sx={{ color: '#00aae7' }}
                      onClick={() => {
                        console.log("Navigate to forgot password page");
                        // You can use navigate("/forgot-password") if using React Router
                      }}
                    >
                      Forgot Password?
                    </Button>
                  </Grid> */}

                  {/* Sign In button on the right */}
                  {/* <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="text"
                      sx={{ color: '#00aae7' }}
                      onClick={() => {
                        console.log("Navigate to sign in page");
                        // For example: navigate("/signin");
                      }}
                    >
                      Sign In
                    </Button>
                  </Grid>
                </Grid> */}
                <Typography variant="body2" sx={{ color: 'white', textAlign: 'center', mt: 7 }}>
                  © 2024 Miracle Software Systems, Inc.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {/* Success Alert */}
      {successAlert && (
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          severity="success"
          // variant='outlined'
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            zIndex: 1000,
          }}
        >
          Login successful...
        </Alert>
      )}
    </div>
  )
}

export default LoginPage

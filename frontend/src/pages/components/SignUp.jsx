import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { useState, useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { AuthContext } from '../../contexts/AuthContexts.jsx'; 

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

export default function SignUp({ onSwitch }) {
  const { handleRegister } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  // Initialize with empty strings to keep inputs controlled
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await handleRegister(name, username, password);
      setMessage("Registration Successful! Please Sign In.");
      setOpen(true)
      setTimeout(() => {
        onSwitch();
      },0);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(`Failed: ${error.response.data.message}`); 
      } else {
        setMessage("Registration Failed: Server Error"); 
      }
      setOpen(true); 
    }
  };

  return (
    <Card variant="outlined">
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
      >
        Sign up
      </Typography>
      <Box
        component="form"
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        onSubmit={handleSubmit}
      >
        {/* NAME FIELD */}
        <FormControl>
          <FormLabel htmlFor="name">Full name</FormLabel>
          <TextField
            autoComplete="name"
            name="name"
            required
            fullWidth
            id="name"
            placeholder="Jon Snow"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>

        {/* USERNAME FIELD */}
        <FormControl>
          <FormLabel htmlFor="username">Username</FormLabel>
          <TextField
            autoComplete="username"
            name="username"
            required
            fullWidth
            id="username"
            placeholder="SnowJon"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>

        {/* PASSWORD FIELD */}
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <TextField
            required
            fullWidth
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
        >
          Sign up
        </Button>
      </Box>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography sx={{ textAlign: 'center' }}>
          Already have an account?{' '}
          <Link
            href="#"
            variant="body2"
            sx={{ alignSelf: 'center' }}
            onClick={(e) => {
               e.preventDefault();
               onSwitch();
            }}
          >
            Sign in
          </Link>
        </Typography>
      </Box>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} message={message}>

      </Snackbar>
    </Card>
  );
}
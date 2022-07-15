import React from 'react';
import Grid from '@mui/material/Grid';
import { Divider, Link, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  return (
    <Grid
      sx={{ margin: '75px 200px 100px 200px', width: 'auto' }}
      container
      spacing={2}
    >
      <Grid item md={12}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', padding: '20px 0' }}>
          Contact us
        </Typography>
        <Typography variant="body1" sx={{}}>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old.
        </Typography>
      </Grid>

      <Grid item md={12}>
        <Container component="main" maxWidth="md">
          <Box
            sx={{
              marginTop: 5,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                multiline
                fullWidth
                name="message"
                label="Message"
                type="text"
                minRows={7}
                id="message"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Send
              </Button>
            </Box>
          </Box>
        </Container>
      </Grid>
      <Grid item md={12}>
        <Divider />
      </Grid>
      <Grid item md={12}>
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          Address
        </Typography>
        <Typography variant="body1" sx={{}}>
          Street
          <br />
          Street
          <br />
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Contact;
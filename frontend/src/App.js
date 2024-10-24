import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TicketBoard from './components/TicketBoard';
import { CssBaseline, AppBar, Toolbar, Typography, Container } from '@mui/material';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#673ab7',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ff0000'
    }
  },
});

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <AppBar position="static" style={{ backgroundColor: '#673ab7' }}>
        <Toolbar>
          <Typography variant="h5"><b>Helpdesk Ticket Management</b></Typography>
        </Toolbar>
      </AppBar>

      <Container
        maxWidth="xl"
        style={{ padding: '20px' }}
      >
        <Routes>
          <Route path="/" element={
            <ThemeProvider theme={theme}>
              <TicketBoard />
            </ThemeProvider>
          } />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

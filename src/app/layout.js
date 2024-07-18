'use client';
import { TripProvider } from '../context/TripContext';
import { AppBar, Toolbar, Typography, Container, Button } from '@mui/material';
import { styled } from '@mui/system';
import Link from 'next/link';
import "./globals.css";

const StyledAppBar = styled(AppBar)({
  marginBottom: '20px',
  backgroundColor: '#fff',
  color: '#000',
});

const StyledContainer = styled(Container)({
  paddingTop: '20px',
});

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

const Layout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <TripProvider>
        <StyledAppBar position="static">
          <StyledToolbar>
            <Typography variant="h6">
              <Link href="/" passHref>
                <Button color="inherit">AERCHAIN</Button>
              </Link>
            </Typography>
            <div>
              <Link href="/" passHref>
                <Button color="inherit">Gmail</Button>
              </Link>
            </div>
          </StyledToolbar>
        </StyledAppBar>
        <StyledContainer>
          {children}
        </StyledContainer>
        </TripProvider>
      </body>
    </html>
  );
};

export default Layout;

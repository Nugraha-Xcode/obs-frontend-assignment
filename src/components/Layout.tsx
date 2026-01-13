import type { ReactNode } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { People as PeopleIcon } from '@mui/icons-material';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
      }}
    >
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: '#1976d2',
          borderBottom: '3px solid',
          borderColor: '#1565c0',
        }}
      >
        <Toolbar sx={{ py: 1.5 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              px: 2,
              py: 1,
              borderRadius: 2,
            }}
          >
            <PeopleIcon sx={{ fontSize: 32 }} />
            <Typography
              variant={isMobile ? 'h6' : 'h5'}
              component="h1"
              sx={{ fontWeight: 700, letterSpacing: 0.5 }}
            >
              User Management
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, px: { xs: 2, sm: 3 } }}>
        {children}
      </Container>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: 'white',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ fontWeight: 500 }}
          >
            © 2026 Agil Nugraha - User Management System - OBS Frontend Assessment
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};
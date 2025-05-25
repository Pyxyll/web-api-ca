// ProfilePage.jsx - Basic structure and imports
import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
  padding: '40px 20px',
  paddingTop: '160px', // Account for floating navbar
}));

const ProfilePaper = styled(Paper)(({ theme }) => ({
  padding: '40px',
  borderRadius: '24px',
  background: 'rgba(15, 23, 42, 0.8)',
  backdropFilter: 'blur(20px) saturate(180%)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
  maxWidth: '500px',
  width: '100%',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
    borderRadius: 'inherit',
    pointerEvents: 'none',
  }
}));

const ProfilePage = () => {
  const { user, userName, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  if (!loading && !isAuthenticated) {
    navigate('/login');
    return null;
  }

  if (loading) {
    return (
      <StyledContainer maxWidth={false}>
        <Typography variant="h6" sx={{ color: 'white' }}>
          Loading...
        </Typography>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer maxWidth={false}>
      <ProfilePaper elevation={0}>
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h4" sx={{ color: 'white', textAlign: 'center' }}>
            Profile Page
          </Typography>
          <Typography variant="body1" sx={{ color: 'white', textAlign: 'center', mt: 2 }}>
            Username: {userName}
          </Typography>
        </Box>
      </ProfilePaper>
    </StyledContainer>
  );
};

export default ProfilePage;
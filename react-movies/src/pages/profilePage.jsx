import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Avatar,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { AccountCircle } from '@mui/icons-material';

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
  padding: '40px 20px',
  paddingTop: '160px',
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

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
    width: 120,
    height: 120,
    border: '4px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
    margin: '0 auto 24px auto',
    fontSize: '3rem',
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
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <ProfileAvatar 
              src={user?.profileImage?.url} 
              alt={userName}
            >
              {!user?.profileImage?.url && <AccountCircle sx={{ fontSize: '3rem' }} />}
            </ProfileAvatar>
            
            <Typography 
              variant="h4" 
              sx={{ 
                mb: 1,
                background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700
              }}
            >
              {userName}
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
            >
              Movie Enthusiast
            </Typography>
          </Box>
        </Box>
      </ProfilePaper>
    </StyledContainer>
  );
};

export default ProfilePage;
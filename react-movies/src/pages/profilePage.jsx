import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Avatar,
  Box,
  Button,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { useContext } from 'react';
import { MoviesContext } from '../contexts/MoviesContext';
import { AccountCircle, Favorite, PlaylistPlay, RateReview, Logout} from '@mui/icons-material';

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

const StatsCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '16px',
  borderRadius: '12px',
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  marginBottom: '12px',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.08)',
    transform: 'translateY(-1px)',
  }
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: '12px 24px',
  borderRadius: '12px',
  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  color: '#ffffff',
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '1rem',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    background: 'linear-gradient(135deg, #5855eb 0%, #7c3aed 100%)',
    transform: 'translateY(-1px)',
    boxShadow: '0 10px 25px rgba(99, 102, 241, 0.4)',
  }
}));

const ProfilePage = () => {
  const { user, userName, signout, isAuthenticated, loading } = useAuth();
  const { favorites, playlist, myReviews } = useContext(MoviesContext);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    signout();
    navigate('/');
  };

  const favoritesCount = favorites?.length || 0;
  const watchlistCount = playlist?.length || 0;
  const reviewsCount = Object.keys(myReviews || {}).length;

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

          <Divider sx={{ mb: 3, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 2, 
                color: 'white',
                fontWeight: 600
              }}
            >
              Your Movie Stats
            </Typography>
            
            <StatsCard>
              <Favorite sx={{ color: '#ef4444', mr: 2, fontSize: 24 }} />
              <Box sx={{ flexGrow: 1 }}>
                <Typography sx={{ color: 'white', fontWeight: 600 }}>
                  Favorites
                </Typography>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem' }}>
                  Movies you love
                </Typography>
              </Box>
              <Typography sx={{ color: '#6366f1', fontWeight: 700, fontSize: '1.5rem' }}>
                {favoritesCount}
              </Typography>
            </StatsCard>

            <StatsCard>
              <PlaylistPlay sx={{ color: '#10b981', mr: 2, fontSize: 24 }} />
              <Box sx={{ flexGrow: 1 }}>
                <Typography sx={{ color: 'white', fontWeight: 600 }}>
                  Watchlist
                </Typography>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem' }}>
                  Movies to watch later
                </Typography>
              </Box>
              <Typography sx={{ color: '#6366f1', fontWeight: 700, fontSize: '1.5rem' }}>
                {watchlistCount}
              </Typography>
            </StatsCard>

            <StatsCard>
              <RateReview sx={{ color: '#f59e0b', mr: 2, fontSize: 24 }} />
              <Box sx={{ flexGrow: 1 }}>
                <Typography sx={{ color: 'white', fontWeight: 600 }}>
                  Reviews
                </Typography>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem' }}>
                  Movies you've reviewed
                </Typography>
              </Box>
              <Typography sx={{ color: '#6366f1', fontWeight: 700, fontSize: '1.5rem' }}>
                {reviewsCount}
              </Typography>
            </StatsCard>
          </Box>

          <Divider sx={{ mb: 3, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

          <Box sx={{ textAlign: 'center' }}>
            <StyledButton
              fullWidth
              startIcon={<Logout />}
              onClick={handleLogout}
              sx={{ 
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                }
              }}
            >
              Sign Out
            </StyledButton>
          </Box>
        </Box>
      </ProfilePaper>
    </StyledContainer>
  );
};

export default ProfilePage;
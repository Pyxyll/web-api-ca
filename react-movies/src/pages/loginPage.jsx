import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  Box,
  Link,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
  padding: '20px',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: '40px',
  borderRadius: '24px',
  background: 'rgba(15, 23, 42, 0.8)',
  backdropFilter: 'blur(20px) saturate(180%)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
  maxWidth: '400px',
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

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6366f1',
    },
  },
  '& .MuiOutlinedInput-input': {
    color: '#ffffff',
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
    '&.Mui-focused': {
      color: '#6366f1',
    },
  },
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
  },
  '&:disabled': {
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'rgba(255, 255, 255, 0.5)',
  }
}));

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { authenticate } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    console.log("📝 Login form submitting for:", formData.username);

    try {
      // Use the AuthContext's authenticate function instead of direct API call
      const result = await authenticate(formData.username, formData.password);
      
      console.log("📝 Login form received result:", result);
      
      if (result.success) {
        console.log("📝 Login successful! Navigating to home...");

        navigate('/');
      } else {
        console.log("📝 Login failed:", result.message);
        setError(result.message || 'Login failed');
      }
    } catch (err) {
      console.error('📝 Login error:', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledContainer maxWidth={false}>
      <StyledPaper elevation={0}>
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography 
            variant="h4" 
            align="center" 
            sx={{ 
              mb: 3,
              background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700
            }}
          >
            Welcome Back
          </Typography>
          
          <Typography 
            variant="body1" 
            align="center" 
            sx={{ mb: 4, color: 'rgba(255, 255, 255, 0.7)' }}
          >
            Sign in to your TMDB Client account
          </Typography>

          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3, 
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                color: '#fecaca',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                '& .MuiAlert-icon': {
                  color: '#f87171'
                }
              }}
            >
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <StyledTextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              margin="normal"
              required
              disabled={loading}
            />
            
            <StyledTextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
              disabled={loading}
            />

            <StyledButton
              type="submit"
              fullWidth
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Sign In'
              )}
            </StyledButton>

            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Don't have an account?{' '}
                <Link
                  component="button"
                  type="button"
                  onClick={() => navigate('/signup')}
                  sx={{
                    color: '#6366f1',
                    textDecoration: 'none',
                    fontWeight: 600,
                    '&:hover': {
                      color: '#8b5cf6',
                      textDecoration: 'underline',
                    }
                  }}
                >
                  Sign up here
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </StyledPaper>
    </StyledContainer>
  );
};

export default LoginPage;
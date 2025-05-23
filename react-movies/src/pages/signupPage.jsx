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
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { CheckCircle, Cancel, PhotoCamera, AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { signup } from '../api/tmdb-api';

const StyledContainer = styled(Container)(( ) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
  padding: '20px',
}));

const StyledPaper = styled(Paper)(() => ({
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

const StyledTextField = styled(TextField)(( ) => ({
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

const StyledButton = styled(Button)(() => ({
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

const ProfileImageContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '24px',
  position: 'relative',
}));

const ProfileAvatar = styled(Avatar)(() => ({
  width: 120,
  height: 120,
  border: '3px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
  marginBottom: '16px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    borderColor: '#6366f1',
  }
}));

const UploadButton = styled(IconButton)(() => ({
  position: 'absolute',
  bottom: 10,
  right: 'calc(50% - 70px)',
  backgroundColor: '#6366f1',
  color: '#ffffff',
  width: 40,
  height: 40,
  border: '3px solid rgba(255, 255, 255, 0.2)',
  '&:hover': {
    backgroundColor: '#5855eb',
    transform: 'scale(1.1)',
  }
}));

const HiddenInput = styled('input')({
  display: 'none',
});

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Password validation
  const passwordRequirements = [
    { test: (pwd) => pwd.length >= 8, text: 'At least 8 characters long' },
    { test: (pwd) => /[A-Za-z]/.test(pwd), text: 'Contains at least one letter' },
    { test: (pwd) => /\d/.test(pwd), text: 'Contains at least one number' },
    { test: (pwd) => /[@$!%*#?&]/.test(pwd), text: 'Contains at least one special character' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear messages when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    setImageLoading(true);
    setError('');

    try {
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);

      // Prepare for upload
      setProfileImage(file);
    } catch (err) {
      setError('Error processing image');
      console.error('Image processing error:', err);
    } finally {
      setImageLoading(false);
    }
  };

  const validateForm = () => {
    if (!formData.username.trim()) {
      setError('Username is required');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setError('Password does not meet requirements');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');

    try {
      // Create FormData for multipart upload
      const signupData = new FormData();
      signupData.append('username', formData.username);
      signupData.append('password', formData.password);
      
      if (profileImage) {
        signupData.append('profileImage', profileImage);
      }

      const response = await signup(signupData);
      
      if (response.success) {
        setSuccess('Account created successfully! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(response.msg || 'Signup failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Signup error:', err);
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
            Create Account
          </Typography>
          
          <Typography 
            variant="body1" 
            align="center" 
            sx={{ mb: 4, color: 'rgba(255, 255, 255, 0.7)' }}
          >
            Join TMDB Client today
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

          {success && (
            <Alert 
              severity="success" 
              sx={{ 
                mb: 3, 
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                color: '#bbf7d0',
                border: '1px solid rgba(34, 197, 94, 0.2)',
                '& .MuiAlert-icon': {
                  color: '#4ade80'
                }
              }}
            >
              {success}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            {/* Profile Image Upload */}
            <ProfileImageContainer>
              <ProfileAvatar 
                src={imagePreview} 
                sx={{ 
                  bgcolor: imagePreview ? 'transparent' : 'rgba(99, 102, 241, 0.2)',
                }}
              >
                {!imagePreview && <AccountCircle sx={{ fontSize: 60, color: 'rgba(255, 255, 255, 0.7)' }} />}
              </ProfileAvatar>
              
              <HiddenInput
                accept="image/*"
                id="profile-image-upload"
                type="file"
                onChange={handleImageChange}
                disabled={loading || imageLoading}
              />
              
              <label htmlFor="profile-image-upload">
                <UploadButton component="span" disabled={loading || imageLoading}>
                  {imageLoading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <PhotoCamera />
                  )}
                </UploadButton>
              </label>
            </ProfileImageContainer>

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

            <StyledTextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              margin="normal"
              required
              disabled={loading}
            />

            {/* Password Requirements */}
            <Box sx={{ mt: 2, mb: 3 }}>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
                Password Requirements:
              </Typography>
              <List dense>
                {passwordRequirements.map((req, index) => {
                  const isValid = req.test(formData.password);
                  return (
                    <ListItem key={index} sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        {isValid ? (
                          <CheckCircle sx={{ fontSize: 16, color: '#4ade80' }} />
                        ) : (
                          <Cancel sx={{ fontSize: 16, color: 'rgba(255, 255, 255, 0.3)' }} />
                        )}
                      </ListItemIcon>
                      <ListItemText 
                        primary={req.text}
                        primaryTypographyProps={{
                          fontSize: '0.875rem',
                          color: isValid ? '#4ade80' : 'rgba(255, 255, 255, 0.5)'
                        }}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </Box>

            <StyledButton
              type="submit"
              fullWidth
              disabled={loading || imageLoading}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Create Account'
              )}
            </StyledButton>

            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Already have an account?{' '}
                <Link
                  component="button"
                  type="button"
                  onClick={() => navigate('/login')}
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
                  Sign in here
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </StyledPaper>
    </StyledContainer>
  );
};

export default SignupPage;
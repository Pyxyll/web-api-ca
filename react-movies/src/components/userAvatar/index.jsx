// components/UserAvatar.jsx
import React, { useState } from 'react';
import { Avatar, Menu, MenuItem, Typography, Divider, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AccountCircle, Logout, Person } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router';


const StyledAvatar = styled(Avatar)(({ theme, size = 'medium' }) => ({
  width: size === 'small' ? 32 : size === 'large' ? 56 : 40,
  height: size === 'small' ? 32 : size === 'large' ? 56 : 40,
  border: '2px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    borderColor: '#6366f1',
    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
  }
}));

const UserMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    backdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
    marginTop: '8px',
    minWidth: '200px',
  },
  '& .MuiMenuItem-root': {
    color: 'rgba(255, 255, 255, 0.9)',
    padding: '12px 20px',
    borderRadius: '8px',
    margin: '4px 8px',
    fontSize: '0.9rem',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: 'rgba(99, 102, 241, 0.2)',
      color: '#ffffff',
    }
  }
}));

const UserAvatar = ({ size = 'medium', showMenu = true }) => {
  const { user, signout, isAuthenticated, userName } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    if (showMenu && isAuthenticated) {
      setAnchorEl(event.currentTarget);
    } else if (!isAuthenticated) {
      navigate('/login');
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleClose();
    navigate('/profile'); // Navigate to profile page
  };

  const handleLogout = () => {
    handleClose();
    signout();
    navigate('/');
  };

  if (!isAuthenticated) {
    return (
      <StyledAvatar size={size} onClick={handleClick}>
        <AccountCircle />
      </StyledAvatar>
    );
  }

  return (
    <>
      <StyledAvatar 
        size={size} 
        src={user?.profileImage?.url} 
        onClick={handleClick}
        alt={user?.username || userName}
      >
        {!user?.profileImage?.url && <AccountCircle />}
      </StyledAvatar>
      
      {showMenu && (
        <UserMenu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="subtitle2" sx={{ color: '#ffffff', fontWeight: 600 }}>
              {user?.username || userName}
            </Typography>
          </Box>
          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
          <MenuItem onClick={handleProfile}>
            <Person sx={{ mr: 2, fontSize: 18 }} />
            Profile
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <Logout sx={{ mr: 2, fontSize: 18 }} />
            Logout
          </MenuItem>
        </UserMenu>
      )}
    </>
  );
};

export default UserAvatar;
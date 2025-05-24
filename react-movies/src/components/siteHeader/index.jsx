import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router";
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAuth } from "../../contexts/AuthContext";
import UserAvatar from "../userAvatar";

const FloatingAppBar = styled(AppBar)(({ theme }) => ({
  position: 'fixed',
  top: '24px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '80%',
  borderRadius: '24px',
  backdropFilter: 'blur(20px) saturate(180%)',
  backgroundColor: 'rgba(15, 23, 42, 0.85)',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 15px 20px -5px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  zIndex: theme.zIndex.appBar,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)',
    borderRadius: 'inherit',
    pointerEvents: 'none',
  },
  [theme.breakpoints.down('sm')]: {
    width: '90%',
    top: '12px',
    borderRadius: '20px',
  }
}));

const FloatingToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: '80px',
  padding: '0 40px',
  position: 'relative',
  zIndex: 1,
  [theme.breakpoints.down('sm')]: {
    minHeight: '72px',
    padding: '0 24px',
  }
}));

const LogoContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  flexGrow: 1,
}));

const LogoImage = styled('img')(({ theme }) => ({
  height: '40px',
  width: 'auto',
  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
  [theme.breakpoints.down('sm')]: {
    height: '36px',
  }
}));

const NavButton = styled(Button)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 500,
  padding: '12px 24px',
  borderRadius: '12px',
  textTransform: 'none',
  color: 'rgba(255, 255, 255, 0.9)',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
    borderRadius: 'inherit',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    color: '#ffffff',
    transform: 'translateY(-1px)',
    boxShadow: '0 8px 25px rgba(99, 102, 241, 0.3)',
    '&::before': {
      opacity: 1,
    }
  },
  '&:active': {
    transform: 'translateY(0)',
  }
}));

const ModernMenu = styled(Menu)(({ theme }) => ({
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
    fontWeight: 500,
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: 'rgba(99, 102, 241, 0.2)',
      color: '#ffffff',
    }
  }
}));

const Offset = styled('div')(({ theme }) => ({
  height: '128px',
  [theme.breakpoints.down('sm')]: {
    height: '96px',
  }
}));

const SiteHeader = ({ history }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { isAuthenticated, loading, user, userName } = useAuth();
  
  const navigate = useNavigate();

  const menuOptions = [
    { label: "Home", path: "/" },
  ];

  // Movie-specific menu items only shown when logged in
  const movieMenuOptions = [
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Popular", path: "/movies/popular" },
    { label: "In Theaters", path: "/movies/now_playing" },
    { label: "Top Rated", path: "/movies/top_rated" },
    { label: "Watch List", path: "/movies/watchlist" },
  ];

  // Combine menu options based on auth status
  const displayMenuOptions = isAuthenticated 
    ? [...menuOptions, ...movieMenuOptions]
    : menuOptions;

  // Add auth-specific menu items for mobile
  const authMenuOptions = isAuthenticated 
    ? displayMenuOptions 
    : [...displayMenuOptions, { label: "Login", path: "/login" }, { label: "Sign Up", path: "/signup" }];

  const handleMenuSelect = (pageURL) => {
    setAnchorEl(null);
    navigate(pageURL, { replace: true });
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <FloatingAppBar elevation={0}>
        <FloatingToolbar>
          <LogoContainer>
            <LogoImage 
              src="/logo.svg" 
              alt="TMDB Client Logo" 
            />
          </LogoContainer>
            {isMobile ? (
              <>
                <IconButton
                  aria-label="menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                  size="medium"
                >
                  <MenuIcon />
                </IconButton>
                <ModernMenu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                >
                  {authMenuOptions.map((opt) => (
                    <MenuItem
                      key={opt.label}
                      onClick={() => handleMenuSelect(opt.path)}
                    >
                      {opt.label}
                    </MenuItem>
                  ))}
                </ModernMenu>
              </>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {displayMenuOptions.map((opt) => (
                  <NavButton
                    key={opt.label}
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </NavButton>
                ))}
                
                {/* Auth Section */}
                {isAuthenticated ? (
                  <Box sx={{ ml: 2 }}>
                    <UserAvatar size="medium" />
                  </Box>
                ) : (
                  <Box sx={{ ml: 2, display: 'flex', gap: 1 }}>
                    <NavButton
                      onClick={() => handleMenuSelect("/login")}
                    >
                      Login
                    </NavButton>
                    <NavButton
                      onClick={() => handleMenuSelect("/signup")}
                      sx={{
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #5855eb 0%, #7c3aed 100%)',
                        }
                      }}
                    >
                      Sign Up
                    </NavButton>
                  </Box>
                )}
              </Box>
            )}
        </FloatingToolbar>
      </FloatingAppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router";
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const FloatingAppBar = styled(AppBar)(({ theme, isScrolled }) => ({
  position: 'fixed',
  top: isScrolled ? '16px' : '24px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: isScrolled ? 'min(calc(100% - 32px), 1000px)' : '80%',
  borderRadius: isScrolled ? '20px' : '24px',
  backdropFilter: 'blur(20px) saturate(180%)',
  backgroundColor: isScrolled 
    ? 'rgba(15, 23, 42, 0.8)' 
    : 'rgba(15, 23, 42, 0.85)',
  background: isScrolled 
    ? 'rgba(15, 23, 42, 0.8)' 
    : 'rgba(15, 23, 42, 0.85)',
  boxShadow: isScrolled 
    ? '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
    : '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 15px 20px -5px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  transformOrigin: 'center center',
  zIndex: theme.zIndex.appBar,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: isScrolled 
      ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)'
      : 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)',
    borderRadius: 'inherit',
    pointerEvents: 'none',
  },
  [theme.breakpoints.down('sm')]: {
    width: isScrolled ? 'calc(100% - 16px)' : '90%',
    top: isScrolled ? '8px' : '12px',
    borderRadius: isScrolled ? '16px' : '20px',
  }
}));

const FloatingToolbar = styled(Toolbar)(({ theme, isScrolled }) => ({
  minHeight: isScrolled ? '64px' : '80px',
  padding: isScrolled ? '0 24px' : '0 40px',
  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  position: 'relative',
  zIndex: 1,
  [theme.breakpoints.down('sm')]: {
    minHeight: isScrolled ? '56px' : '72px',
    padding: isScrolled ? '0 16px' : '0 24px',
  }
}));

const LogoContainer = styled('div')(({ theme, isScrolled }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: isScrolled ? '12px' : '16px',
  flexGrow: 1,
  transition: 'gap 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
}));

const LogoImage = styled('img')(({ theme, isScrolled }) => ({
  height: isScrolled ? '32px' : '40px',
  width: 'auto',
  transition: 'height 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
  [theme.breakpoints.down('sm')]: {
    height: isScrolled ? '28px' : '36px',
  }
}));

const LogoText = styled(Typography)(({ theme, isScrolled }) => ({
  fontSize: isScrolled ? '1.75rem' : '2.5rem',
  fontWeight: 700,
  background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  letterSpacing: '-0.025em',
  transition: 'font-size 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  [theme.breakpoints.down('sm')]: {
    fontSize: isScrolled ? '1.5rem' : '2rem',
  }
}));

const NavButton = styled(Button)(({ theme, isScrolled }) => ({
  fontSize: isScrolled ? '0.875rem' : '1rem',
  fontWeight: 500,
  padding: isScrolled ? '8px 16px' : '12px 24px',
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

const ModernIconButton = styled(IconButton)(({ theme, isScrolled }) => ({
  color: 'rgba(255, 255, 255, 0.9)',
  borderRadius: '12px',
  padding: isScrolled ? '8px' : '10px',
  transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  '&:hover': {
    color: '#ffffff',
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    transform: 'translateY(-1px)',
    boxShadow: '0 8px 25px rgba(99, 102, 241, 0.3)',
  }
}));

const ModernMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    backdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
    marginTop: '8px',
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

const Offset = styled('div')(({ theme, isScrolled }) => ({
  height: isScrolled ? '96px' : '128px',
  transition: 'height 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  [theme.breakpoints.down('sm')]: {
    height: isScrolled ? '72px' : '96px',
  }
}));

const SiteHeader = ({ history }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  
  const navigate = useNavigate();

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Popular", path: "/movies/popular" },
    { label: "In Theaters", path: "/movies/now_playing" },
    { label: "Top Rated", path: "/movies/top_rated" },
    { label: "Watch List", path: "/movies/watchlist" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuSelect = (pageURL) => {
    setAnchorEl(null);
    navigate(pageURL, { replace: true });
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <FloatingAppBar elevation={0} isScrolled={isScrolled}>
        <FloatingToolbar isScrolled={isScrolled}>
          <LogoContainer isScrolled={isScrolled}>
            <LogoImage 
              src="/logo.svg" 
              alt="TMDB Client Logo" 
              isScrolled={isScrolled}
            />
          </LogoContainer>
            {isMobile ? (
              <>
                <ModernIconButton
                  aria-label="menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  isScrolled={isScrolled}
                >
                  <MenuIcon />
                </ModernIconButton>
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
                  {menuOptions.map((opt) => (
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
              <>
                {menuOptions.map((opt) => (
                  <NavButton
                    key={opt.label}
                    onClick={() => handleMenuSelect(opt.path)}
                    isScrolled={isScrolled}
                  >
                    {opt.label}
                  </NavButton>
                ))}
              </>
            )}
        </FloatingToolbar>
      </FloatingAppBar>
      <Offset isScrolled={isScrolled} />
    </>
  );
};

export default SiteHeader;
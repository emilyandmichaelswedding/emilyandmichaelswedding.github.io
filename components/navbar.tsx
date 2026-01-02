import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

interface ButtonAppBarProps {
  isMobile?: boolean;
}

export default function ButtonAppBar({ isMobile = false }: ButtonAppBarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Schedule of Events', href: '/schedule' },
    { label: 'Your Trip to Victoria', href: '/trip' }
  ];

  return (
    <Box className="relative">
      <Toolbar variant="dense" className="flex justify-between items-center">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        </Typography>
        
        {/* Desktop Navigation - Hidden on mobile */}
        {!isMobile && (
          <div className="flex space-x-2">
            {menuItems.map((item, index) => (
              <Button 
                key={index}
                color="inherit" 
                href={item.href} 
                className="text-md"
                style={{ fontFamily: 'inherit' }}
              >
                {item.label}
              </Button>
            ))}
          </div>
        )}

        {/* Mobile Hamburger Button - Only visible on mobile */}
        {isMobile && (
          <div>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleMenu}
              className="p-2"
            >
              <div className="space-y-1">
                <div className={`w-6 h-0.5 bg-current transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                <div className={`w-6 h-0.5 bg-current transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                <div className={`w-6 h-0.5 bg-current transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
              </div>
            </IconButton>
          </div>
        )}
      </Toolbar>

      {/* Mobile Menu - Only visible when open */}
      {isMobile && (
        <div className={`absolute top-full left-0 right-0 bg-white shadow-lg transition-all duration-300 ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="p-4 space-y-2">
            {menuItems.map((item, index) => (
              <Button
                key={index}
                color="inherit"
                href={item.href}
                fullWidth
                className="text-md justify-start"
                style={{ fontFamily: 'inherit' }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      )}
    </Box>
  );
}
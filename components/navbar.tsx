import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

interface ButtonAppBarProps {
  isMobile?: boolean; // optional override from parent
}

export default function ButtonAppBar({ isMobile: isMobileOverride }: ButtonAppBarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileDetected, setIsMobileDetected] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const detect = () => setIsMobileDetected(window.innerWidth < 768);
    detect();
    window.addEventListener('resize', detect);
    return () => window.removeEventListener('resize', detect);
  }, []);

  const isMobile = isMobileOverride ?? isMobileDetected ?? false;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Schedule of Events', href: '/schedule' },
    { label: 'Your Trip to Victoria', href: '/trip' },
    { label: 'RSVP', href: '/rsvp' }
  ];

  return (
    <Box className="relative z-30 text-gray-900 dark:text-gray-100">
      <Toolbar
        variant="dense"
        className="flex justify-between items-center bg-white/90 dark:bg-gray-950/90 backdrop-blur"
      >
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
                className={`text-md ${item.label === 'RSVP' ? 'rounded' : ''}`}
                style={{ 
                  fontFamily: 'inherit',
                  ...(item.label === 'RSVP' ? {
                    backgroundColor: '#667eea',
                    color: 'white',
                    padding: '6px 16px'
                  } : {})
                }}
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
        <div className={`absolute top-full left-0 right-0 z-20 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg transition-all duration-300 ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="p-4 space-y-2">
            {menuItems.map((item, index) => (
              <Button
                key={index}
                color="inherit"
                href={item.href}
                fullWidth
                className={`text-md justify-start ${item.label === 'RSVP' ? 'rounded' : ''}`}
                style={{ 
                  fontFamily: 'inherit',
                  ...(item.label === 'RSVP' ? {
                    backgroundColor: '#667eea',
                    color: 'white',
                    marginBottom: '4px'
                  } : {})
                }}
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
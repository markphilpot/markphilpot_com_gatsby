import React, { useCallback } from 'react';
import { Box, IconButton, useColorMode } from 'theme-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const Hero = props => {
  const { hero } = props;

  const [colorMode, setColorMode] = useColorMode();

  const handleThemeChange = useCallback(() => {
    setColorMode(colorMode === 'default' ? 'dark' : 'default');
  }, [colorMode, setColorMode]);

  if (hero == null) {
    return null;
  }

  return (
    <Box
      css={{
        position: 'relative',
        height: '250px',
        backgroundPosition: 'center center',
        backgroundImage: `url(${hero.publicURL})`,
        backgroundSize: 'cover',
      }}
    >
      <IconButton
        aria-label={'Toggle Dark Mode'}
        sx={{
          position: 'absolute',
          bottom: 6,
          right: 6,
          cursor: 'pointer',
          '&:focus': {
            outline: 'none',
          },
          '&:hover': {
            opacity: 1,
          },
          fontSize: 3,
          bg: 'accent',
          opacity: 0.6,
          transition: 'opacity 0.2s ease',
        }}
        onClick={handleThemeChange}
      >
        <FontAwesomeIcon icon={colorMode === 'default' ? faMoon : faSun} />
      </IconButton>
    </Box>
  );
};

export default Hero;

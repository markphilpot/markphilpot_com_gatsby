import React, { useState, useCallback, useEffect } from 'react';
import { Box, IconButton, useColorMode } from 'theme-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faTextHeight } from '@fortawesome/free-solid-svg-icons';

function removeElement(element) {
    element && element.parentNode && element.parentNode.removeChild(element);
}

const Hero = props => {
  const { hero } = props;

  const [useDoubleSpace, setUseDoubleSpace] = useState(false);
  const [colorMode, setColorMode] = useColorMode();

  const handleThemeChange = useCallback(() => {
    setColorMode(colorMode === 'default' ? 'dark' : 'default');
  }, [colorMode, setColorMode]);

  const handleDoubleSpace = useCallback(() => {
    setUseDoubleSpace(!useDoubleSpace);
  }, [useDoubleSpace]);

  useEffect(() => {
    if(useDoubleSpace) {
      const style = document.createElement('style');
      style.type = 'text/css';
      const css = 'section > p { line-height: 2.8 !important; }';
      style.appendChild(document.createTextNode(css));
      document.head.appendChild(style);

      return () => {
        removeElement(style);
      }
    }
  }, [useDoubleSpace])

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
        aria-label={'Toggle Double Spaced'}
        sx={{
          position: 'absolute',
          bottom: 6,
          right: 64,
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
        onClick={handleDoubleSpace}
      >
        <FontAwesomeIcon icon={faTextHeight} color={useDoubleSpace ? '#ffffff' : '#000000'}/>
      </IconButton>
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

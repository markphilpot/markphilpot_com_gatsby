import React, { useState, useCallback, useEffect } from 'react';
import { Box, IconButton, useColorMode } from 'theme-ui';
import { IoSunnyOutline, IoMoonOutline, IoTextOutline, IoFilterCircleOutline, IoFilterCircle } from 'react-icons/io5';
import { StaticImage } from 'gatsby-plugin-image';

function removeElement(element) {
  element && element.parentNode && element.parentNode.removeChild(element);
}

const Hero = props => {
  const { hero, showDoubleSpace = true, showFilterMicro = false } = props;

  const [useDoubleSpace, setUseDoubleSpace] = useState(false);
  const [filterMicro, setFilterMicro] = useState(false);
  const [colorMode, setColorMode] = useColorMode();

  const handleThemeChange = useCallback(() => {
    setColorMode(colorMode === 'light' ? 'dark' : 'light');
  }, [colorMode, setColorMode]);

  const handleDoubleSpace = useCallback(() => {
    setUseDoubleSpace(x => !x);
  }, []);

  const handleFilterMicro = useCallback(() => {
    setFilterMicro(x => !x);
  }, []);

  useEffect(() => {
    if (useDoubleSpace) {
      const style = document.createElement('style');
      style.type = 'text/css';
      const css = 'section > p { line-height: 2.8 !important; }';
      style.appendChild(document.createTextNode(css));
      document.head.appendChild(style);

      return () => {
        removeElement(style);
      };
    }
  }, [useDoubleSpace]);

  useEffect(() => {
    if (filterMicro) {
      const style = document.createElement('style');
      style.type = 'text/css';
      const css = 'article[datatype="micro"] { display: none; }';
      style.appendChild(document.createTextNode(css));
      document.head.appendChild(style);

      return () => {
        removeElement(style);
      };
    }
  }, [filterMicro]);

  return (
    <Box
      css={{
        position: 'relative',
        height: '250px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
      }}
      style={{
        backgroundImage: hero ? `url(${hero.publicURL})` : 'undefined',
      }}
    >
      {!hero && (
        <StaticImage
          style={{ width: '100%', height: '250px' }}
          imgStyle={{ objectFit: 'cover', objectPosition: '65% center' }}
          src={'../images/sutro_vignette.jpg'}
          alt={'Sutro Tower'}
        />
      )}
      {showDoubleSpace && (
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
            opacity: 0.8,
            transition: 'opacity 0.2s ease',
          }}
          onClick={handleDoubleSpace}
        >
          <IoTextOutline />
        </IconButton>
      )}
      {showFilterMicro && (
        <IconButton
          aria-label={'Filter micro posts'}
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
          onClick={handleFilterMicro}
        >
          {filterMicro ? <IoFilterCircle size={'1.8rem'} /> : <IoFilterCircleOutline size={'1.8rem'} />}
        </IconButton>
      )}
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
        {colorMode === 'light' ? <IoSunnyOutline /> : <IoMoonOutline />}
      </IconButton>
    </Box>
  );
};

export default Hero;

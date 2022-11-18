import React, { useState, useCallback, useEffect } from 'react';
import { IoSunnyOutline, IoMoonOutline, IoTextOutline, IoFilterCircleOutline, IoFilterCircle } from 'react-icons/io5';
import { StaticImage } from 'gatsby-plugin-image';
import IconButton from './IconButton';

function removeElement(element) {
  element && element.parentNode && element.parentNode.removeChild(element);
}

const Hero = (props) => {
  const { hero, showDoubleSpace = true, showFilterMicro = false } = props;

  const [useDoubleSpace, setUseDoubleSpace] = useState(false);
  const [filterMicro, setFilterMicro] = useState(false);

  const handleDoubleSpace = useCallback(() => {
    setUseDoubleSpace((x) => !x);
  }, []);

  const handleFilterMicro = useCallback(() => {
    setFilterMicro((x) => !x);
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
      const css = 'div[datatype="micro"] { display: none; }';
      style.appendChild(document.createTextNode(css));
      document.head.appendChild(style);

      return () => {
        removeElement(style);
      };
    }
  }, [filterMicro]);

  return (
    <div
      className={'relative flex h-[250px] items-center justify-center bg-cover bg-center'}
      style={{
        backgroundImage: hero ? `url(${hero.publicURL})` : 'undefined',
      }}
    >
      {!hero && (
        <StaticImage
          style={{ width: '100%', height: '250px' }}
          imgStyle={{ objectFit: 'cover', objectPosition: '65% center' }}
          src={'../../images/sutro_vignette.jpg'}
          alt={'Sutro Tower'}
        />
      )}
      {/* {showDoubleSpace && (
        <IconButton
          aria-label={'Toggle Double Spaced'}
          className={'absolute bottom-2 right-16'}
          onClick={handleDoubleSpace}
        >
          <IoTextOutline size={'1.8rem'} />
        </IconButton>
      )} */}
      {/* {showFilterMicro && (
        <IconButton
          aria-label={'Filter micro posts'}
          className={'absolute bottom-2 right-16'}
          onClick={handleFilterMicro}
        >
          {filterMicro ? <IoFilterCircle size={'1.8rem'} /> : <IoFilterCircleOutline size={'1.8rem'} />}
        </IconButton>
      )} */}
    </div>
  );
};

export default Hero;

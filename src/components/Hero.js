import React from 'react';
import { Box } from 'theme-ui';

const Hero = (props) => {
  const { hero } = props;

  if(hero == null) {
    return null;
  }

  return (
    <Box css={{
      height: '250px',
      backgroundPosition: 'center center',
      backgroundImage: `url(${hero.publicURL})`,
    }}/>
  )
}

export default Hero;

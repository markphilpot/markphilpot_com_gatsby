import React from 'react';

import { Box, Text } from 'theme-ui'
import { Link } from 'gatsby';

const Footer = (props) => {
  return (
    <footer
      style={{
        margin: '0 auto',
        maxWidth: '33rem',
      }}
    >
      <Box sx={{
        my: 4
      }} css={{
        textAlign: 'center'
      }}>
        <Text>By <Link to={'https://twitter.com/mark_philpot'}>mark_philpot</Link></Text>
        <Text>&copy; 2003-{new Date().getFullYear()}</Text>
      </Box>
    </footer>
  )
}

export default Footer;

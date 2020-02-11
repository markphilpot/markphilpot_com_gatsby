import React from 'react';

import { Box, Text } from 'theme-ui';
import { CenterColumn } from './layout';
import Link from './Link';

const Footer = props => {
  return (
    <footer>
      <CenterColumn>
        <Box
          sx={{
            my: 4,
          }}
          css={{
            textAlign: 'center',
          }}
        >
          <Text>
            By <Link to={'https://twitter.com/mark_philpot'}>mark_philpot</Link>
          </Text>
          <Text>&copy; 2003-{new Date().getFullYear()}</Text>
        </Box>
      </CenterColumn>
    </footer>
  );
};

export default Footer;

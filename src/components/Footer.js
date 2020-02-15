import React from 'react';

import { Box, Text, Link } from 'theme-ui';
import { CenterColumn } from './layout';

const Footer = props => {
  return (
    <footer>
      <CenterColumn>
        <Box
          sx={{
            my: 10,
          }}
          css={{
            textAlign: 'center',
          }}
        >
          <Text
            sx={{
              color: 'muted',
              variant: 'text.caps',
              fontWeight: 'bold',
              fontSize: 1,
            }}
          >
            By <Link href={'https://twitter.com/mark_philpot'}>@mark_philpot</Link>
          </Text>
          <Text
            sx={{
              fontSize: 1,
            }}
          >
            &copy; 2003-{new Date().getFullYear()}
          </Text>
        </Box>
      </CenterColumn>
    </footer>
  );
};

export default Footer;

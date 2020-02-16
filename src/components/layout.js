import React from 'react';
import { Box } from 'theme-ui';
import Footer from './Footer';

import './layout.css';

export const CenterColumn = ({ children }) => {
  return (
    <Box
      css={{
        margin: '0 auto',
        maxWidth: '740px',
        padding: '0 30px',
      }}
    >
      {children}
    </Box>
  );
};

const Layout = ({ children }) => {
  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;

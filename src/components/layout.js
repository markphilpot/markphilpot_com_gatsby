import React from 'react';
import { Box } from 'theme-ui';
import Footer from './Footer';

import './layout.css';

export const CenterColumn = ({ children }) => {
  return (
    <Box
      css={{
        margin: '0 auto',
        maxWidth: '660px',
      }}
    >
      {children}
    </Box>
  );
};

const Layout = ({ location, title, children }) => {
  // const rootPath = `${__PATH_PREFIX__}/`;
  // let header;
  //
  // if (location.pathname === rootPath) {
  //   header = (
  //     <h1
  //       style={{
  //         marginTop: 0,
  //       }}
  //     >
  //       <Link
  //         style={{
  //           boxShadow: `none`,
  //           textDecoration: `none`,
  //           color: `inherit`,
  //         }}
  //         to={`/`}
  //       >
  //         {title}
  //       </Link>
  //     </h1>
  //   );
  // } else {
  //   header = (
  //     <h3
  //       style={{
  //         marginTop: 0,
  //       }}
  //     >
  //       <Link
  //         style={{
  //           boxShadow: `none`,
  //           textDecoration: `none`,
  //           color: `inherit`,
  //         }}
  //         to={`/`}
  //       >
  //         {title}
  //       </Link>
  //     </h3>
  //   );
  // }
  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
      }}
    >
      <main>{children}</main>
      {/*<footer>© {new Date().getFullYear()}</footer>*/}
      <Footer />
    </div>
  );
};

export default Layout;

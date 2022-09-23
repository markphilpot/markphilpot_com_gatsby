import React from 'react';
import Footer from './Footer';

import './layout.css';
import classNames from 'classnames';
import colors from '../styles/colors';

export const CenterColumn = ({ children }) => {
  return <div className="mx-auto max-w-[740px] px-8">{children}</div>;
};

const Layout = ({ children }) => {
  return (
    <div className={classNames(colors.backgrounds.default, colors.text.default, 'min-h-screen')}>
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

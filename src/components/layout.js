import React from 'react';
import Footer from './Footer';

import './layout.css';

export const CenterColumn = ({ children }) => {
  return <div className="mx-auto max-w-[740px] px-8">{children}</div>;
};

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-100 text-black dark:bg-neutral-900 dark:text-stone-300">
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

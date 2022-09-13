import React from 'react';
import { CenterColumn } from './layout';

const Footer = (props) => {
  return (
    <footer>
      <CenterColumn>
        <div className="my-10 text-center">
          <div className="text-sm font-bold uppercase">
            By <a href={'https://twitter.com/mark_philpot'}>@mark_philpot</a>
          </div>
          <div className="text-sm">&copy; 2003-{new Date().getFullYear()}</div>
        </div>
      </CenterColumn>
    </footer>
  );
};

export default Footer;

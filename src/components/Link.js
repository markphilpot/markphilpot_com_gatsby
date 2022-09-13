import React from 'react';
import { Link as GatsbyLink } from 'gatsby';

const Link = (props) => {
  return (
    <GatsbyLink
      {...props}
      activeClassName="active"
      className="transition hover:text-fuchsia-700 hover:dark:text-fuchsia-400"
    />
  );
};

export default Link;

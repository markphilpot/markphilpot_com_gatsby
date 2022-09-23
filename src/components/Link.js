import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import classNames from 'classnames';
import colors from '../styles/colors';

const Link = (props) => {
  return <GatsbyLink {...props} activeClassName="active" className={classNames('transition', colors.text.linkHover)} />;
};

export default Link;

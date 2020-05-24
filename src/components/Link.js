import React from 'react';
import { Link } from 'theme-ui';
// import { Link } from 'gatsby';
import _ from 'lodash';
import { navigate } from '@reach/router';

export default props => {
  const { to, ...rest } = props;

  let mixin = {};

  if (to != null) {
    mixin = {
      onClick: e => {
        e.preventDefault();
        navigate(to);
      },
    };
  }

  return (
    <Link
      {...rest}
      {...mixin}
      sx={{
        color: 'inherit',
        '&.active': {
          color: 'linkHover',
        },
        '&:hover': {
          color: 'linkHover',
        },
        cursor: 'pointer',
        transition: 'color 0.2s ease',
        ..._.get(props, 'sx', {}),
      }}
    />
  );
};

/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Link as GatsbyLink } from 'gatsby';
import _ from 'lodash';

const Link = props => {
  return (
    <GatsbyLink
      {...props}
      activeClassName="active"
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

export default Link;

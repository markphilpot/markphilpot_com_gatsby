/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Link } from 'gatsby';
import _ from 'lodash';

export default props => (
  <Link
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
      transition: 'color 0.2s ease',
      ..._.get(props, 'sx', {}),
    }}
  />
);

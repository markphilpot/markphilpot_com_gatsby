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
        color: 'primary',
      },
      ..._.get(props, 'sx', {}),
    }}
  />
);

import React from 'react';
// import { Link } from 'gatsby';
import { Flex } from 'theme-ui';
import { CenterColumn } from './layout';
import Link from './Link';

const NavBar = props => {
  return (
    <CenterColumn>
      <Flex
        sx={{
          justifyContent: 'space-around',
          borderBottom: '1px solid',
          borderColor: 'accent',
          py: 6,
          px: 10,
          mb: 10,
        }}
      >
        <Link to={`${__PATH_PREFIX__}/`} sx={{ variant: 'styles.navlink' }}>
          Posts
        </Link>
        <Link to={`${__PATH_PREFIX__}/micro`} sx={{ variant: 'styles.navlink' }}>
          &micro;&beta;
        </Link>
        <Link to={`${__PATH_PREFIX__}/about`} sx={{ variant: 'styles.navlink' }}>
          About
        </Link>
        <Link to={`${__PATH_PREFIX__}/projects`} sx={{ variant: 'styles.navlink' }}>
          ~/projects
        </Link>
      </Flex>
    </CenterColumn>
  );
};

export default NavBar;

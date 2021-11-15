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
          justifyContent: ['space-between', 'space-between', 'space-around'],
          borderBottom: '1px solid',
          borderColor: 'accent',
          py: 6,
          px: [0, 0, 10],
          mb: 10,
        }}
      >
        <Link to={`${__PATH_PREFIX__}/`} sx={{ variant: 'styles.navlink' }}>
          posts
        </Link>
        {/*<Link to={`${__PATH_PREFIX__}/micro`} sx={{ variant: 'styles.navlink' }}>*/}
        {/*  &micro;&beta;*/}
        {/*</Link>*/}
        <Link to={`${__PATH_PREFIX__}/about`} sx={{ variant: 'styles.navlink' }}>
          about
        </Link>
        <Link to={`${__PATH_PREFIX__}/spaces`} sx={{ variant: 'styles.navlink' }}>
          spaces
        </Link>
        <Link to={`${__PATH_PREFIX__}/projects`} sx={{ variant: 'styles.navlink' }}>
          ~/projects
        </Link>
        {/*<Link to={`${__PATH_PREFIX__}/anime/watching`} sx={{ variant: 'styles.navlink' }}>
                  anime
                </Link>*/}
      </Flex>
    </CenterColumn>
  );
};

export default NavBar;

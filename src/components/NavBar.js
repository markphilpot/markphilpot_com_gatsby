import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
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
        <Link to={`${__PATH_PREFIX__}/watching`} sx={{ variant: 'styles.navlink' }}>
          <FontAwesomeIcon icon={faEye} />
        </Link>
        <Link to={`${__PATH_PREFIX__}/notes`} sx={{ variant: 'styles.navlink' }}>
          notes
        </Link>
        <Link to={`${__PATH_PREFIX__}/projects`} sx={{ variant: 'styles.navlink' }}>
          ~/projects
        </Link>
      </Flex>
    </CenterColumn>
  );
};

export default NavBar;

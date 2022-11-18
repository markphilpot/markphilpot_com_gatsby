import React from 'react';
import { IoEyeOutline } from 'react-icons/io5';
import { CenterColumn } from './layout';
import Link from './Link';

const NavBar = (props) => {
  return (
    <CenterColumn>
      <div className="mb-4 flex max-h-16 justify-around overflow-hidden border-b py-3 text-xl">
        <Link to={`${__PATH_PREFIX__}/`}>posts</Link>
        <Link href={`https://micro.markphilpot.com`}>µposts</Link>
        <Link to={`${__PATH_PREFIX__}/about`}>about</Link>
        {/* <Link to={`${__PATH_PREFIX__}/watching`}>
          <IoEyeOutline />
        </Link> */}
        <Link to={`${__PATH_PREFIX__}/notes`}>notes</Link>
        <Link to={`${__PATH_PREFIX__}/projects`}>~/projects</Link>
      </div>
    </CenterColumn>
  );
};

export default NavBar;

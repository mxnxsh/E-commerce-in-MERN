import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className='row'>
      <div>
        <Link className='brand' to='/'>
          amazona
        </Link>
      </div>
      <div>
        <Link to='/cart'>cart</Link>
        <Link to='/signin'>signin</Link>
      </div>
    </header>
  );
}
export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  return (
    <header className='row'>
      <div>
        <Link className='brand' to='/'>
          amazona
        </Link>
      </div>
      <div>
        <Link to='/cart'>
          Cart
          {cartItems.length > 0 && (
            <span className='badge'>{cartItems.length}</span>
          )}
        </Link>
        <Link to='/signin'>Signin</Link>
      </div>
    </header>
  );
};
export default Navbar;

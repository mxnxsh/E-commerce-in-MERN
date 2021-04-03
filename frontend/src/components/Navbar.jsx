import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../actions/userActions';

const Navbar = () => {
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const userSignIn = useSelector(state => state.userSignIn);
  const { userInfo } = userSignIn;

  const dispatch = useDispatch();
  const signOutHandler = () => {
    dispatch(signOut());
  };

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
        {userInfo ? (
          <div className='dropdown'>
            <Link to='#'>
              {userInfo.name} <i className='fa fa-caret-down'></i>{' '}
            </Link>
            <ul className='dropdown-content'>
              <li>
                <Link to='#signout' onClick={signOutHandler}>
                  Sign Out
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <Link to='/signin'>Signin</Link>
        )}
      </div>
    </header>
  );
};
export default Navbar;

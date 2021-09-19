import React from 'react';
import { Link, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../actions/userActions';
import SearchBox from './SearchBox';

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
        <Route render={({ history }) => <SearchBox history={history} />} />
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
              {userInfo.name} <i className='fa fa-caret-down'></i>
            </Link>
            <ul className='dropdown-content'>
              <li>
                <Link to='/orderhistory'>Order History</Link>
              </li>
              <li>
                <Link to='/profile'>User Profile</Link>
              </li>
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
        {userInfo && userInfo.isSeller && (
          <div className='dropdown'>
            <Link to='#admin'>
              Seller <i className='fa fa-caret-down'></i>
            </Link>
            <ul className='dropdown-content'>
              <li>
                <Link to='/dashboard/seller'>Dashboard</Link>
              </li>
              <li>
                <Link to='/productlist/seller'>Products</Link>
              </li>
              <li>
                <Link to='/orderlist/seller'>Orders</Link>
              </li>
            </ul>
          </div>
        )}
        {userInfo && userInfo.isAdmin && (
          <div className='dropdown'>
            <Link to='#admin'>
              Admin <i className='fa fa-caret-down'></i>
            </Link>
            <ul className='dropdown-content'>
              <li>
                <Link to='/dashboard'>Dashboard</Link>
              </li>
              <li>
                <Link to='/productlist'>Products</Link>
              </li>
              <li>
                <Link to='/orderlist'>Orders</Link>
              </li>
              <li>
                <Link to='/userlist'>Users</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};
export default Navbar;

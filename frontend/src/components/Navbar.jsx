import React, { useEffect, useState } from "react";
import { Link, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../actions/userActions";
import SearchBox from "./SearchBox";
import { listProductCategories } from "../actions/productActions";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";

const Navbar = () => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const userSignIn = useSelector(state => state.userSignIn);
  const { userInfo } = userSignIn;

  const productCategoryList = useSelector(state => state.productCategoryList);
  const {
    loading: loadingCategory,
    error: errorCategory,
    categories,
  } = productCategoryList;

  const dispatch = useDispatch();
  const signOutHandler = () => {
    dispatch(signOut());
  };
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);
  return (
    <>
      <header className="row">
        <div>
          <button
            type="button"
            className="open-sidebar"
            onClick={() => setSidebarIsOpen(true)}
          >
            <i className="fa fa-bars"></i>
          </button>
          <Link className="brand" to="/">
            amazona
          </Link>
        </div>
        <div>
          <Route render={({ history }) => <SearchBox history={history} />} />
        </div>
        <div>
          <Link to="/cart">
            Cart
            {cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )}
          </Link>
          {userInfo ? (
            <div className="dropdown">
              <Link to="#">
                {userInfo.name} <i className="fa fa-caret-down"></i>
              </Link>
              <ul className="dropdown-content">
                <li>
                  <Link to="/orderhistory">Order History</Link>
                </li>
                <li>
                  <Link to="/profile">User Profile</Link>
                </li>
                <li>
                  <Link to="#signout" onClick={signOutHandler}>
                    Sign Out
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/signin">Signin</Link>
          )}
          {userInfo && userInfo.isSeller && (
            <div className="dropdown">
              <Link to="#admin">
                Seller <i className="fa fa-caret-down"></i>
              </Link>
              <ul className="dropdown-content">
                <li>
                  <Link to="/dashboard/seller">Dashboard</Link>
                </li>
                <li>
                  <Link to="/productlist/seller">Products</Link>
                </li>
                <li>
                  <Link to="/orderlist/seller">Orders</Link>
                </li>
              </ul>
            </div>
          )}
          {userInfo && userInfo.isAdmin && (
            <div className="dropdown">
              <Link to="#admin">
                Admin <i className="fa fa-caret-down"></i>
              </Link>
              <ul className="dropdown-content">
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/productlist">Products</Link>
                </li>
                <li>
                  <Link to="/orderlist">Orders</Link>
                </li>
                <li>
                  <Link to="/userlist">Users</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>
      <aside className={sidebarIsOpen ? "open" : ""}>
        <ul className="categories">
          <li>
            <strong>Categories</strong>
            <button
              onClick={() => setSidebarIsOpen(false)}
              className="close-sidebar"
              type="button"
            >
              <i className="fa fa-times"></i>
            </button>
          </li>
          {loadingCategory ? (
            <LoadingBox />
          ) : errorCategory ? (
            <MessageBox variant="danger">{errorCategory}</MessageBox>
          ) : (
            categories.map(category => (
              <li key={category}>
                <Link
                  to={`/search/category/${category}`}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  {category}
                </Link>
              </li>
            ))
          )}
        </ul>
      </aside>
    </>
  );
};
export default Navbar;

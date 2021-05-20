import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { deleteProduct, listProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_DELETE_RESET } from '../constants/productConstants';

const ProductListScreen = props => {
  const sellerMode = props.match.path.indexOf('/seller') >= 0;
  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector(state => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
    product,
  } = productDelete;

  const userSignIn = useSelector(state => state.userSignIn);
  const { userInfo } = userSignIn;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProduct({ seller: sellerMode ? userInfo._id : '' }));
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
  }, [dispatch, successDelete, sellerMode, userInfo._id]);

  const deleteHandler = product => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteProduct(product._id));
    }
  };

  return (
    <div>
      <div className='row'>
        <h1>Products</h1>
        <Link to='/create-product' className='primary linkButton'>
          Create Product
        </Link>
      </div>

      {loadingDelete && <LoadingBox />}
      {errorDelete && <MessageBox variant='danger'>{errorDelete}</MessageBox>}
      {
        product && console.log('product')
        // <MessageBox variant='success'>{`${product.name} is deleted successfully`}</MessageBox>
      }

      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox varient='danger'>{error}</MessageBox>
      ) : products.length === 0 ? (
        <MessageBox varient='success'>
          NO PRODUCT CREATED. <Link to='/create-product'>CREATE PRODUCT</Link>
        </MessageBox>
      ) : (
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>{moment(product.createdAt).fromNow()}</td>
                <td>
                  <button
                    type='button'
                    className='small'
                    onClick={() =>
                      props.history.push(`/product/${product._id}/edit`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    type='button'
                    className='small'
                    onClick={() => deleteHandler(product)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductListScreen;

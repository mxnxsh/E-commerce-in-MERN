import React from 'react';
import { Link } from 'react-router-dom';
import data from '../data';
import Rating from '../components/Rating';
function ProductScreen(props) {
  const product = data.products.find(x => x._id === props.match.params.id);
  const {
    name,
    image,
    price,
    description,
    rating,
    numReviews,
    countInStock,
  } = product;
  return (
    <div>
      <Link to='/'>Back to result </Link>
      <div className='row top'>
        <div className='col-2'>
          <img src={image} alt={name} className='large' />
        </div>
        <div className='col-1'>
          <ul>
            <li>
              <h1>{name}</h1>
            </li>
            <li>
              <Rating rating={rating} numReviews={numReviews} />
            </li>
            <li>{`Price: Rs ${price}`}</li>
            <li>
              Description:
              <p>{description}</p>
            </li>
          </ul>
        </div>
        <div className='col-1'>
          <div className='card card-body'>
            <ul>
              <li>
                <div className='row'>
                  <div>Price</div>
                  <div className='price'>Rs:{price}</div>
                </div>
              </li>
              <li>
                <div className='row'>
                  <div>Status:</div>
                  <div>
                    {countInStock > 0 ? (
                      <span className='success'>In Stock</span>
                    ) : (
                      <span className='danger'>Unavailable</span>
                    )}
                  </div>
                </div>
              </li>
              <li>
                <button className='primary block'>Add to Cart</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductScreen;

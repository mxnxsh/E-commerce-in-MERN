import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { createProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const CreateProductScreen = props => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');

  const productCreate = useSelector(state => state.productCreate);
  const { loading, error, product, success } = productCreate;

  const dispatch = useDispatch();
  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      createProduct({
        name,
        price,
        image,
        category,
        countInStock,
        brand,
        description,
      })
    );
    setName('');
    setPrice('');
    setBrand('');
    setCategory('');
    setCountInStock('');
    setImage('');
    setDescription('');
  };
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');

  const userSignIn = useSelector(state => state.userSignIn);
  const { userInfo } = userSignIn;
  const uploadFileHandler = async e => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };
  return (
    <div>
      <form className='form' onSubmit={submitHandler}>
        <div>
          <h1>Create Product</h1>
        </div>
        {/* {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant='danger'>{error}</MessageBox>
        ) : ( */}
        {/* <> */}
        {loading && <LoadingBox />}
        {error && <MessageBox variant='danger'>{error}</MessageBox>}
        {success && (
          <MessageBox variant='success'>{`${product.name} created successfully`}</MessageBox>
        )}
        <div>
          <label htmlFor='name'>Name</label>
          <input
            id='name'
            type='text'
            placeholder='Enter name'
            value={name}
            onChange={e => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor='price'>Price</label>
          <input
            id='price'
            type='text'
            placeholder='Enter price'
            value={price}
            onChange={e => setPrice(e.target.value)}
          ></input>
        </div>
        <div style={{ display: 'none' }}>
          <label htmlFor='image'>Image</label>
          <input
            id='image'
            type='text'
            placeholder='Enter image'
            value={image}
            onChange={e => setImage(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor='imageFile'>Image File</label>
          <input
            type='file'
            id='imageFile'
            label='Choose Image'
            onChange={uploadFileHandler}
          ></input>
          {loadingUpload && <LoadingBox></LoadingBox>}
          {errorUpload && (
            <MessageBox variant='danger'>{errorUpload}</MessageBox>
          )}
        </div>
        <div>
          <label htmlFor='category'>Category</label>
          <input
            id='category'
            type='text'
            placeholder='Enter category'
            value={category}
            onChange={e => setCategory(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor='brand'>Brand</label>
          <input
            id='brand'
            type='text'
            placeholder='Enter brand'
            value={brand}
            onChange={e => setBrand(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor='countInStock'>Count In Stock</label>
          <input
            id='countInStock'
            type='text'
            placeholder='Enter countInStock'
            value={countInStock}
            onChange={e => setCountInStock(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            rows='3'
            type='text'
            placeholder='Enter description'
            value={description}
            onChange={e => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label />
          <button className='primary' type='submit'>
            Create Product
          </button>
        </div>
        <div>
          <label />
          <button
            className='primary'
            onClick={() => props.history.push('/productlist')}
          >
            Back
          </button>
        </div>
        {/* </> */}
        {/* )} */}
      </form>
    </div>
  );
};

export default CreateProductScreen;

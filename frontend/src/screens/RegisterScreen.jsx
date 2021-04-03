import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { register } from '../actions/userActions';

const RegisterScreen = props => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const userRegister = useSelector(state => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Password and confirm password are not match');
    } else {
      dispatch(register(name, email, password));
    }
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo, redirect, props.history]);

  return (
    <div>
      <form className='form' onSubmit={submitHandler}>
        <div>
          <h1>Create an account</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox varient='danger'>{error}</MessageBox>}
        <div>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            id='name'
            placeholder='Enter Name'
            required
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='email'>Email address</label>
          <input
            type='email'
            id='email'
            placeholder='Enter Email'
            required
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            placeholder='Enter password'
            required
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='password'>Confirm password</label>
          <input
            type='password'
            id='confirmPassword'
            placeholder='Enter confirm password'
            required
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          <label />
          <button className='primary' type='submit'>
            Register
          </button>
        </div>
        <div>
          <label />
          <div>
            Already have an account? <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterScreen;

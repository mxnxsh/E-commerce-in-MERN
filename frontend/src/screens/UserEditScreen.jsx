import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updatedUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_RESET } from '../constants/userConstants';

const UserEditScreen = props => {
  const userId = props.match.params.id;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSeller, setIsSeller] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector(state => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      props.history.push('/userlist');
    }
    if (!user) {
      dispatch(detailsUser(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsSeller(user.isSeller);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, user, userId, successUpdate, props.history]);
  const submitHandler = e => {
    e.preventDefault();
    dispatch(updatedUser({ _id: userId, name, email, isSeller, isAdmin }));
  };

  return (
    <div>
      <form className='form' onSubmit={submitHandler}>
        <div>
          <h1>Edit user {name}</h1>
        </div>
        {loadingUpdate && <LoadingBox />}
        {errorUpdate && <MessageBox variant='danger'>{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant='danger'></MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor='name'>Name</label>
              <input
                type='text'
                id='name'
                placeholder='Enter Name'
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                id='email'
                placeholder='Enter Email'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='isSeller'>Is Seller</label>
              <input
                type='checkbox'
                id='isSeller'
                checked={isSeller ? true : false}
                onChange={e => setIsSeller(e.target.checked)}
              />
            </div>
            <div>
              <label htmlFor='isAdmin'>Is Admin</label>
              <input
                type='checkbox'
                id='isAdmin'
                checked={isAdmin ? true : false}
                onChange={e => setIsAdmin(e.target.checked)}
              />
            </div>
            <button type='submit' className='primary '>
              Update
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default UserEditScreen;
